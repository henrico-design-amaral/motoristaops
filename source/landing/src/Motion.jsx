import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {MOTION,animateElement,motionAllowed,serviceDelay} from './motion.mjs';

export function usePageMotion(root) {
  useEffect(()=>{
    const page=root.current;
    if(!page)return;
    const running=[];
    const play=(el,frames,options)=>{const a=animateElement(el,frames,options);if(a)running.push(a);};
    page.querySelectorAll('.hero-line').forEach((el,i)=>play(el,[{opacity:.65,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:MOTION.hero,delay:i*MOTION.heroGap}));
    for(const [selector,delay] of [['.hero-description',120],['.hero .social-links',180]])
      play(page.querySelector(selector),[{opacity:.65,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,delay});
    let observer;
    if(window.IntersectionObserver){
      const cards=[...page.querySelectorAll('.service')];
      observer=new IntersectionObserver(entries=>{
        for(const entry of entries){
          if(!entry.isIntersecting)continue;
          observer.unobserve(entry.target);
          if(entry.target.contains(document.activeElement))continue;
          const columns=getComputedStyle(entry.target.parentElement).gridTemplateColumns.split(' ').length;
          play(entry.target,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:MOTION.service,delay:serviceDelay(cards.indexOf(entry.target),columns)});
        }
      },{rootMargin:'0px 0px 48px 0px',threshold:0});
      cards.forEach(card=>observer.observe(card));
    }
    return()=>{observer?.disconnect();running.forEach(a=>a.cancel());};
  },[root]);
}

export function ProcessFlow({children}) {
  const grid=useRef(),path=useRef();
  const [route,setRoute]=useState({d:'',width:1,height:1});
  useLayoutEffect(()=>{
    const el=grid.current;
    const measure=()=>{
      const rect=el.getBoundingClientRect();
      const tops=[...el.querySelectorAll('.step-top')].map(e=>e.getBoundingClientRect());
      if(!tops.length)return;
      const rows=[];
      for(const top of tops){const y=top.bottom-rect.top-.5;if(!rows.some(r=>Math.abs(r.y-y)<2))rows.push({y,top:top.top-rect.top});}
      let d=`M 1 ${rows[0].y} L ${rect.width-1} ${rows[0].y}`;
      for(let i=1;i<rows.length;i++){
        const rowArticles=[...el.querySelectorAll('.step')].filter(e=>e.getBoundingClientRect().top-rect.top<rows[i].top-2);
        const bottom=Math.max(...rowArticles.map(e=>e.getBoundingClientRect().bottom-rect.top));
        const gap=(bottom+rows[i].top)/2;
        d+=` L ${rect.width-1} ${gap} L 1 ${gap} L 1 ${rows[i].y} L ${rect.width-1} ${rows[i].y}`;
      }
      setRoute({d,width:rect.width,height:rect.height});
    };
    measure();
    const observer=window.ResizeObserver?new ResizeObserver(measure):null;
    observer?.observe(el);
    window.addEventListener('resize',measure);
    return()=>{observer?.disconnect();window.removeEventListener('resize',measure);};
  },[]);
  useEffect(()=>{
    if(!route.d||!window.IntersectionObserver)return;
    const el=grid.current;
    if(el.dataset.motionPlayed)return;
    const running=[];
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return;
      el.dataset.motionPlayed='true';observer.disconnect();
      const line=path.current,length=line.getTotalLength();
      line.style.strokeDasharray=String(length);
      const a=animateElement(line,[{strokeDashoffset:length},{strokeDashoffset:0}],{duration:MOTION.process});if(a)running.push(a);
      el.querySelectorAll('.step-top>span').forEach((number,i)=>{
        const a=animateElement(number,[{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,delay:i*60});if(a)running.push(a);
      });
    },{threshold:.15});
    observer.observe(el);
    return()=>{observer.disconnect();running.forEach(a=>a.cancel());};
  },[route.d]);
  return <div className="steps" ref={grid}><svg className="process-route" viewBox={`0 0 ${route.width} ${route.height}`} aria-hidden="true" focusable="false"><path ref={path} d={route.d}/></svg>{children}</div>;
}

export function CrossfadeImage({src,alt,motion=true,...props}) {
  const [shown,setShown]=useState({src,alt}),[previous,setPrevious]=useState(null);
  const current=useRef(),animation=useRef(),last=useRef(shown),generation=useRef(0);
  useEffect(()=>{
    if(src===shown.src)return;
    let live=true,settled=false;
    const incoming=new Image();
    const ready=()=>{
      if(!live||settled)return;
      settled=true;
      setPrevious(motion&&motionAllowed()?shown:null);
      setShown({src,alt});
    };
    incoming.onload=ready;
    incoming.onerror=()=>{if(live){setPrevious(null);setShown({src,alt});}};
    incoming.src=src;
    if(incoming.complete&&incoming.naturalWidth)ready();
    return()=>{live=false;incoming.onload=null;incoming.onerror=null;};
  },[src,alt,motion,shown]);
  useLayoutEffect(()=>{
    if(last.current.src===shown.src)return;
    last.current=shown;
    const token=++generation.current;
    animation.current?.cancel();
    const a=previous&&motion?animateElement(current.current,[{opacity:0},{opacity:1}],{duration:MOTION.gallery}):null;
    animation.current=a;
    const clear=()=>{if(generation.current===token)setPrevious(null);};
    if(a)a.finished.then(clear,clear);else clear();
    return()=>{generation.current++;a?.cancel();};
  },[shown]);
  return <><img {...props} ref={current} className="gallery-current" src={shown.src} alt={shown.alt}/>{previous&&<img className="gallery-previous" src={previous.src} alt="" aria-hidden="true"/>}</>;
}

export function AnimatedFAQ({question,answer,icon}) {
  const details=useRef(),summary=useRef(),body=useRef(),animation=useRef(),sequence=useRef(0),intent=useRef(false);
  useEffect(()=>()=>{sequence.current++;animation.current?.cancel();},[]);
  const toggle=event=>{
    event.preventDefault();
    const el=details.current,next=!intent.current,token=++sequence.current;
    intent.current=next;
    const start=el.getBoundingClientRect().height;
    animation.current?.cancel();
    if(!motionAllowed()||event.detail===0||!el.animate){
      animation.current=null;el.open=next;el.style.overflow='';delete el.dataset.closing;return;
    }
    el.open=true;
    el.dataset.closing=String(!next);
    const border=el.offsetHeight-el.clientHeight;
    const end=summary.current.getBoundingClientRect().height+(next?body.current.getBoundingClientRect().height:0)+border;
    el.style.overflow='hidden';
    const a=animateElement(el,[{height:`${start}px`},{height:`${end}px`}],{duration:MOTION.disclosure,fill:'forwards'});
    const finish=()=>{
      if(sequence.current!==token)return;
      el.open=next;el.style.overflow='';delete el.dataset.closing;
      animation.current=null;a?.cancel();
    };
    animation.current=a;
    if(a)a.finished.then(finish,finish);else finish();
  };
  return <details ref={details} onToggle={()=>{if(!animation.current)intent.current=details.current.open;}}><summary ref={summary} onClick={toggle}>{question}{icon}</summary><div ref={body} className="faq-answer"><p>{answer}</p></div></details>;
}

export function FloatingContact({visible,href,icon}) {
  const [focused,setFocused]=useState(false);
  const show=visible||focused;
  return <a className="floating-wa" href={href} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento no WhatsApp" data-visible={show?'true':'false'} aria-hidden={show?undefined:true} inert={show?undefined:true} tabIndex={show?undefined:-1} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}>{icon}<span>Vamos conversar</span></a>;
}

export function useMessageMotion(ref,value) {
  useLayoutEffect(()=>{
    if(!value)return;
    const a=animateElement(ref.current,[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:MOTION.message});
    return()=>a?.cancel();
  },[ref,value]);
}
