import assert from 'node:assert/strict';
import { summarizeOperation, classifyBankMovement, modelAllocations } from '../src/lib/unified-ledger.mjs';

const rows = [
  { operation_date:'2026-11-09', revenue_uber:100, revenue_99:20, revenue_private:50, tips_extras:5, fuel_cost:15, food_cost:10, wash_cost:0, other_operational_cost:0, hours_online:5, km_total:80, trips_uber:5, trips_99:1, trips_private:1 },
  { operation_date:'2026-11-10', revenue_uber:80, revenue_99:0, revenue_private:0, tips_extras:0, fuel_cost:20, food_cost:0, wash_cost:5, other_operational_cost:0, hours_online:4, km_total:60, trips_uber:4, trips_99:0, trips_private:0 },
  { operation_date:'2026-10-31', revenue_uber:9999, hours_online:1, km_total:2 }
];
const result = summarizeOperation(rows, '2026-11');
assert.equal(result.operationalRevenue,255);
assert.equal(result.operationalCost,50);
assert.equal(result.operationalProfit,205);
assert.equal(result.privateProduced,50);
assert.equal(result.uber,180);
assert.equal(result.days,2);
assert.equal(result.trips,11);
assert.equal(result.hours,9);
assert.equal(result.km,140);
assert.equal(result.revenuePerHour,28.33);
assert.equal(classifyBankMovement({internalTransfer:true,workIncome:true}),'balance_movement');
assert.equal(classifyBankMovement({assetTransfer:true}),'balance_movement');
assert.equal(classifyBankMovement({cardPayment:true}),'balance_movement');
assert.equal(classifyBankMovement({familySupport:true}),'family_support');
assert.equal(classifyBankMovement({workIncome:true}),'work_receipt');
assert.throws(()=>summarizeOperation([rows[0],rows[0]],'2026-11'),/duplicado/);
assert.throws(()=>summarizeOperation([{operation_date:'2026-11-11',revenue_uber:-1}],'2026-11'),/invalido/);
const allocations = modelAllocations(255);
assert.deepEqual(allocations, {car:61.2,ppf:28.05,other:89.25,free:76.5,total:255});
const cents = modelAllocations(0.01);
assert.equal(cents.car + cents.ppf + cents.other + cents.free,0.01);
assert.throws(()=>modelAllocations(-1),/invalido/);
console.log('unified-ledger: assertions passed');
