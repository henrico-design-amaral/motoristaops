import {test} from 'node:test';
import assert from 'node:assert/strict';
import {animateElement,motionAllowed,serviceDelay,MOTION} from '../src/motion.mjs';

test('server rendering never attempts browser animation',()=>{
 assert.equal(motionAllowed(),false);
 assert.equal(animateElement({animate(){throw Error('Must not animate on server');}},[]),null);
});
test('motion respects reduced preference, including changes during playback',async()=>{
 const media={matches:true,addEventListener(type,fn){assert.equal(type,'change');this.listener=fn;}};
 globalThis.window={matchMedia:()=>media};
 try{
  let calls=0,cancelled=false,reject;
  const animation={finished:new Promise((_,no)=>{reject=no;}),cancel(){cancelled=true;reject(new Error('cancelled'));}};
  const element={animate(frames,options){calls++;assert.equal(options.easing,MOTION.easing);return animation;}};
  assert.equal(animateElement(element,[],{duration:200}),null);assert.equal(calls,0);
  media.matches=false;
  assert.equal(animateElement(element,[],{duration:200}),animation);assert.equal(calls,1);
  media.matches=true;media.listener({matches:true});
  await Promise.resolve();assert.equal(cancelled,true);
  assert.equal(animateElement(element,[]),null);
 }finally{delete globalThis.window;}
});
test('unsupported browsers keep normal content, and service stagger resets each row',()=>{
 globalThis.window={matchMedia:()=>({matches:false})};
 try{assert.equal(animateElement({},[]),null);}finally{delete globalThis.window;}
 assert.deepEqual([0,1,2,3,4,5,6,7].map(i=>serviceDelay(i,4)),[0,40,80,120,0,40,80,120]);
 assert.deepEqual([0,1,2].map(i=>serviceDelay(i,1)),[0,0,0]);
 assert.equal(MOTION.hero+2*MOTION.heroGap,420);
});
