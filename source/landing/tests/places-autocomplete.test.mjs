import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  isValidPlacesConfig,readPlacesConfig,selectionText,
  attachPlacesField,enhancePlacesFields
} from '../src/places-autocomplete.mjs';

const safeKey='AIza'+'z'.repeat(35);

test('autocomplete always fails closed without a valid explicit Maps browser config',async()=>{
  assert.equal(isValidPlacesConfig({enabled:false,browserKey:safeKey}),false);
  assert.equal(isValidPlacesConfig({enabled:true,browserKey:'private-secret'}),false);
  assert.equal(isValidPlacesConfig({enabled:true,browserKey:safeKey}),true);
  let requests=0;
  const disabled=await readPlacesConfig(async(url,options)=>{
    requests++;
    assert.equal(url,'/assets/places-config.json');
    assert.equal(options.cache,'no-store');
    return {ok:true,json:async()=>({enabled:false,browserKey:''})};
  });
  assert.equal(requests,1);
  assert.equal(disabled,null);
  const failed=await readPlacesConfig(async()=>{throw new Error('network down');});
  assert.equal(failed,null);
  const noFields=await enhancePlacesFields([],{readConfig:async()=>null});
  assert.equal(typeof noFields,'function');noFields();
});

test('selection preserves user-readable POI text, normalizes spaces, enforces length',()=>{
  assert.equal(selectionText('  Aeroporto de Congonhas, São Paulo  ','Av. Washington Luís'), 'Aeroporto de Congonhas, São Paulo');
  assert.equal(selectionText('  ', ' Av. Paulista, 1000  '),'Av. Paulista, 1000');
  assert.equal(selectionText('a'.repeat(250),'Rua Augusta, 500',30),'Rua Augusta, 500');
  assert.equal(selectionText('a'.repeat(250),'b'.repeat(220),14),'a'.repeat(14));
  assert.equal(selectionText('Aeroporto  de  Guarulhos',null),'Aeroporto de Guarulhos');
});

test('production documents reference both identical suggestion modules and keep both original form fields',()=>{
  const mobile=fs.readFileSync('dist/mobile/index.html','utf8');
  const desktop=fs.readFileSync('src/TripForm.jsx','utf8');
  for(const selector of ['places-origem-mount','places-destino-mount','/assets/places-autocomplete.mjs','/assets/places-autocomplete.css'])
    assert.ok(mobile.includes(selector),selector);
  for(const token of ['enhancePlacesFields','origemInputRef','destinoInputRef','origemMountRef','destinoMountRef'])
    assert.ok(desktop.includes(token),token);
  for(const asset of ['places-autocomplete.mjs','places-autocomplete.css','places-config.json']){
    assert.ok(fs.existsSync('dist/assets/'+asset),asset);
  }
  const config=JSON.parse(fs.readFileSync('dist/assets/places-config.json','utf8'));
  assert.equal(typeof config.enabled,'boolean');
  if(config.enabled)assert.ok(isValidPlacesConfig(config));
  else assert.equal(config.browserKey,'');
  assert.ok(mobile.includes('Nenhuma reserva') || mobile.includes('reserva'));
  const policy=fs.readFileSync('scripts/legal-pages.mjs','utf8');
  assert.ok(policy.includes('Google Maps Platform'));
  assert.ok(policy.includes('https://policies.google.com/privacy'));
  const style=fs.readFileSync('dist/assets/places-autocomplete.css','utf8');
  assert.ok(style.includes('mops-places-google'));
  assert.ok(style.includes('font-size:12px'));
  assert.ok(style.includes('white-space:nowrap'));
});

test('mocked Places (New) prediction completes just one session and emits native changes',async()=>{
  class NodeMock {
    constructor(tag='div'){this.tag=tag;this.attrs=new Map();this.listeners=new Map();this.children=[];this.hidden=false;this.dataset={};this.value='';this.textContent='';this.maxLength=220;this.name='origem';}
    getAttribute(name){return this.attrs.get(name)??null;}
    setAttribute(name,value){this.attrs.set(name,String(value));}
    removeAttribute(name){this.attrs.delete(name);}
    addEventListener(name,fn){const list=this.listeners.get(name)||[];list.push(fn);this.listeners.set(name,list);}
    removeEventListener(name,fn){this.listeners.set(name,(this.listeners.get(name)||[]).filter(f=>f!==fn));}
    dispatchEvent(event){for(const fn of this.listeners.get(event.type)||[])fn(event);return true;}
    append(...nodes){this.children.push(...nodes);for(const n of nodes)n.parent=this;}
    appendChild(node){this.append(node);}
    replaceChildren(...nodes){this.children=nodes;for(const n of nodes)n.parent=this;}
    remove(){this.parent?.children.splice(this.parent.children.indexOf(this),1);}
    contains(target){return this===target || this.children.some(node=>node.contains?.(target));}
    querySelector(selector) {
      if(selector.startsWith('[data-place-index="')) {
        const index=selector.match(/"(\d+)"/)?.[1];
        return this.children.find(n=>n.dataset?.placeIndex===index)||null;
      }
      return null;
    }
    focus(){doc.activeElement=this;}
  }
  const doc=new NodeMock('document');
  doc.createElement=tag=>new NodeMock(tag);
  const previous=globalThis.document;
  globalThis.document=doc;
  const input=new NodeMock('input'),mount=new NodeMock('mount');
  const queries=[],detailFields=[],selected=[];
  const prediction={
    text:{toString:()=> 'Aeroporto de Congonhas, São Paulo - SP'},
    toPlace:()=>({
      formattedAddress:'Av. Washington Luís, São Paulo, SP',
      fetchFields:async ({fields})=>{detailFields.push(fields);}
    })
  };
  const loader=async()=>{
    return {
      AutocompleteSessionToken:class Token{},
      AutocompleteSuggestion:{
        fetchAutocompleteSuggestions:async request=>{
          queries.push(request);
          return {suggestions:[{placePrediction:prediction}]};
        }
      }
    };
  };
  try{
    const cleanup=attachPlacesField({
      input,mount,config:{enabled:true,browserKey:safeKey},locale:'pt',
      onSelect:(name,address)=>selected.push({name,address}),loader
    });
    assert.equal(input.getAttribute('role'),'combobox');
    input.value='congonhas';input.dispatchEvent(new Event('input'));
    await new Promise(resolve=>setTimeout(resolve,410));
    assert.equal(queries.length,1);
    assert.equal(queries[0].input,'congonhas');
    assert.equal(queries[0].language,'pt-BR');
    assert.equal(queries[0].region,'br');
    assert.ok(queries[0].sessionToken);
    assert.equal(input.getAttribute('aria-expanded'),'true');
    assert.ok(mount.children.some(node=>node.textContent?.includes('Google') || node.children?.some(n=>n.textContent==='Google Maps')));
    input.dispatchEvent({type:'keydown',key:'ArrowDown',preventDefault(){}});
    input.dispatchEvent({type:'keydown',key:'Enter',preventDefault(){}});
    await new Promise(resolve=>setTimeout(resolve,40));
    assert.deepEqual(detailFields,[['formattedAddress']]);
    assert.equal(selected.length,1);
    assert.equal(selected[0].name,'origem');
    assert.equal(input.value,'Aeroporto de Congonhas, São Paulo - SP');
    assert.equal(input.getAttribute('aria-expanded'),'false');
    await new Promise(resolve=>setTimeout(resolve,400));
    assert.equal(queries.length,1,'selection must not start another paid search');
    cleanup();
    assert.equal(input.getAttribute('role'),null);
    assert.equal(mount.children.length,0);
  }finally{globalThis.document=previous;}
});
