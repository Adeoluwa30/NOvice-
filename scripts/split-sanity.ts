import { calculateSplit } from '../src/lib/split';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const equal = calculateSplit(1001, 'EQUAL', [
  { memberId: 'a' },
  { memberId: 'b' },
  { memberId: 'c' }
]);
assert(equal.map((x) => x.amountKobo).join(',') === '334,334,333', 'Equal split remainder failed');

const custom = calculateSplit(5000, 'CUSTOM', [
  { memberId: 'a', value: 20 },
  { memberId: 'b', value: 30 }
]);
assert(custom.reduce((n, i) => n + i.amountKobo, 0) === 5000, 'Custom split sum failed');

const percentage = calculateSplit(1000, 'PERCENTAGE', [
  { memberId: 'a', value: 33.33 },
  { memberId: 'b', value: 33.33 },
  { memberId: 'c', value: 33.34 }
]);
assert(percentage.reduce((n, i) => n + i.amountKobo, 0) === 1000, 'Percentage split sum failed');

console.log('split sanity checks passed');
