import test from 'node:test';
import assert from 'node:assert/strict';
import {seoPages,renderSeoPage} from '../scripts/seo-pages.mjs';

const relativeLuminance = (hex) => {
  const rgb = [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
  const linear = rgb.map(value=>value <= 0.04045 ? value/12.92 : ((value+0.055)/1.055)**2.4);
  return .2126*linear[0] + .7152*linear[1] + .0722*linear[2];
};
const contrastRatio = (a,b) => {
  const x=relativeLuminance(a),y=relativeLuminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
};

test('service page small text uses approved brand tokens with WCAG AA contrast', () => {
  const background='#F3EFE4', foreground='#151518';
  assert.ok(contrastRatio(foreground,background) >= 4.5,'Small text contrast must be >= 4.5:1');
  assert.equal(seoPages.length,4);
  for (const page of seoPages) {
    const html=renderSeoPage(page,'/assets/app/index-test.css');
    assert.ok(html.includes('.seo-light .seo-kicker{color:#151518}'),page.slug+' kicker');
    assert.ok(html.includes('.seo-point .seo-number{font-size:12px;font-weight:600;color:#151518}'),page.slug+' markers');
    assert.ok(html.includes('<meta name="viewport"'),page.slug+' viewport');
  }
});
