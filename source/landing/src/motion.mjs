export const MOTION = Object.freeze({
  easing:'cubic-bezier(.22,1,.36,1)', hero:340, heroGap:40,
  service:280, serviceGap:40, process:420, gallery:200,
  disclosure:200, message:180, exit:130,
});
const active = new Set();
let preference;
export function motionAllowed() {
  return typeof window!=='undefined' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}
export function animateElement(element, frames, options={}) {
  if(!element?.animate || !motionAllowed())return null;
  if(!preference){
    preference=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    preference?.addEventListener('change',event=>{if(event.matches)for(const animation of [...active])animation.cancel();});
  }
  const animation=element.animate(frames,{easing:MOTION.easing,fill:'backwards',...options});
  active.add(animation);
  const release=()=>active.delete(animation);
  animation.finished.then(release,release);
  return animation;
}
export function serviceDelay(index, columns) {
  return (index % Math.max(1,columns))*MOTION.serviceGap;
}
