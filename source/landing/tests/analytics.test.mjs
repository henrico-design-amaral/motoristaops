import test from 'node:test';
import assert from 'node:assert/strict';
import {setPermission,recordContact} from '../src/analytics.mjs';
import {prepareTripRequest} from '../src/trip-request.mjs';

test('measurement waits for consent, preserves ad attribution and omits form data',()=>{
  const scripts=[];
  global.window={};
  global.document={createElement:()=>({}),head:{appendChild:el=>scripts.push(el)}};
  global.location=new URL('https://www.motoristaops.com.br/?gclid=TEST_ONLY&text=private');
  setPermission(false,false);
  recordContact('formulario');
  assert.equal(scripts.length,0);
  assert.equal(window.dataLayer,undefined);
  setPermission(true,false);
  setPermission(true,false);
  assert.equal(scripts.length,1);
  const config=window.dataLayer.find(args=>args[0]==='config');
  assert.equal(config[2].page_location,'https://www.motoristaops.com.br/?gclid=TEST_ONLY');
  recordContact('formulario');
  const events=window.dataLayer.filter(args=>args[0]==='event');
  assert.equal(events.length,1);
  assert.deepEqual(Array.from(events[0]),['event','whatsapp_click',{send_to:'G-ZQZ76XPPLP',cta_location:'formulario'}]);
});
test('larger parties can request partner availability without confirming capacity',()=>{
  const quote=prepareTripRequest({origem:'A',destino:'B',passageiros:'5+'});
  assert.deepEqual(quote.errors,{});
  assert.match(quote.summary.passageiros,/sob consulta/);
  assert.match(new URL(quote.href).searchParams.get('text'),/5 ou mais/);
});
