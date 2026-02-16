export type SplitInput = {
  memberId: string;
  value?: number;
};

export type SplitType = 'EQUAL' | 'CUSTOM' | 'PERCENTAGE';

export function calculateSplit(totalKobo: number, splitType: SplitType, items: SplitInput[]) {
  if (totalKobo <= 0) {
    throw new Error('Total amount must be more than zero.');
  }
  if (!items.length) {
    throw new Error('Add at least one member.');
  }

  if (splitType === 'EQUAL') {
    const base = Math.floor(totalKobo / items.length);
    const remainder = totalKobo % items.length;
    return items.map((item, index) => ({
      memberId: item.memberId,
      amountKobo: base + (index < remainder ? 1 : 0)
    }));
  }

  if (splitType === 'CUSTOM') {
    const allocations = items.map((item) => ({
      memberId: item.memberId,
      amountKobo: Math.round((item.value ?? 0) * 100)
    }));
    const sum = allocations.reduce((acc, curr) => acc + curr.amountKobo, 0);
    if (sum !== totalKobo) {
      throw new Error('Custom amounts must add up to the bill total.');
    }
    return allocations;
  }

  const percentages = items.map((item) => ({ memberId: item.memberId, percent: item.value ?? 0 }));
  const sumPercent = percentages.reduce((acc, curr) => acc + curr.percent, 0);
  if (Math.round(sumPercent * 100) !== 10000) {
    throw new Error('Percentages must add up to 100%.');
  }

  const allocations = percentages.map((item) => ({
    memberId: item.memberId,
    amountKobo: Math.floor((totalKobo * item.percent) / 100)
  }));

  const allocated = allocations.reduce((acc, curr) => acc + curr.amountKobo, 0);
  let remainder = totalKobo - allocated;
  let i = 0;
  while (remainder > 0) {
    allocations[i].amountKobo += 1;
    remainder -= 1;
    i = (i + 1) % allocations.length;
  }

  return allocations;
}
