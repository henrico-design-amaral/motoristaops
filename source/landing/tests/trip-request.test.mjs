import {test} from 'node:test';
import assert from 'node:assert/strict';
import {prepareTripRequest} from '../src/trip-request.mjs';
const base={origem:'Av. Paulista, 1000 — São Paulo',destino:'Aeroporto de Congonhas',data:'2026-10-24',horario:'08:30',passageiros:'2'};
test('empty and whitespace-only addresses cannot prepare a message',()=>{
  const r=prepareTripRequest({...base,origem:'  \n',destino:''},'2026-10-23');
  assert.deepEqual(Object.keys(r.errors),['origem','destino']);assert.equal(r.href,undefined);
});
test('past and impossible dates cannot become a valid request',()=>{
  assert.ok(prepareTripRequest({...base,data:'2026-10-22'},'2026-10-23').errors.data);
  assert.ok(prepareTripRequest({...base,data:'2026-02-30'},'2026-01-01').errors.data);
});
test('WhatsApp URL round-trips accents, symbols, line breaks and Brazilian date',()=>{
  const r=prepareTripRequest({...base,detalhes:'2 malas & 1 mochila\nRetorno às 17h?'},'2026-10-23');
  assert.deepEqual(r.errors,{});
  const u=new URL(r.href);assert.equal(u.hostname,'wa.me');assert.equal(u.pathname,'/5511988329725');
  assert.equal(u.searchParams.get('text'),r.message);assert.match(r.message,/24\/10\/2026/);assert.match(r.message,/2 malas & 1 mochila\nRetorno às 17h\?/);
});
test('optional schedule remains unconfirmed and invalid capacity is rejected',()=>{
  const r=prepareTripRequest({...base,data:'',horario:''},'2026-10-23');assert.equal(r.summary.data,'A combinar');assert.equal(r.summary.horario,'A combinar');
  assert.ok(prepareTripRequest({...base,passageiros:'5'},'2026-10-23').errors.passageiros);
});
