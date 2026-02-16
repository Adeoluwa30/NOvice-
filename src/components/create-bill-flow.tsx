'use client';

import { SplitType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';

type Member = { id: string; name: string };

export function CreateBillFlow({ groupId, members }: { groupId: string; members: Member[] }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('');
  const [splitType, setSplitType] = useState<SplitType>('EQUAL');
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  const sum = useMemo(
    () =>
      members.reduce((acc, m) => {
        const n = Number.parseFloat((values[m.id] ?? '0').replace(/,/g, ''));
        return acc + (Number.isFinite(n) ? n : 0);
      }, 0),
    [members, values]
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!members.length) {
      setError('Add members first.');
      return;
    }

    if (splitType === 'CUSTOM') {
      const totalNumber = Number.parseFloat(total.replace(/,/g, ''));
      if (Math.round(sum * 100) !== Math.round(totalNumber * 100)) {
        setError('Custom amounts must match total.');
        return;
      }
    }

    if (splitType === 'PERCENTAGE' && Math.round(sum * 100) !== 10000) {
      setError('Percentages must add up to 100.');
      return;
    }

    const billRes = await fetch(`/api/groups/${groupId}/bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, total, splitType })
    });

    if (!billRes.ok) {
      setError('Could not create bill.');
      return;
    }

    const bill = await billRes.json();

    const allocations = members.map((member) => ({
      memberId: member.id,
      value:
        splitType === 'EQUAL'
          ? undefined
          : Number.parseFloat((values[member.id] ?? '0').replace(/,/g, '')) || 0
    }));

    const sharesRes = await fetch(`/api/bills/${bill.id}/shares`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ splitType, allocations })
    });

    if (!sharesRes.ok) {
      setError((await sharesRes.json()).error || 'Could not create split shares.');
      return;
    }

    router.push(`/groups/${groupId}/bills/${bill.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bill title (optional)" className="w-full" />
      <input
        required
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        placeholder="Total amount e.g. 25,000"
        className="w-full"
      />
      <select value={splitType} onChange={(e) => setSplitType(e.target.value as SplitType)} className="w-full">
        <option value="EQUAL">Equal</option>
        <option value="CUSTOM">Custom Amount</option>
        <option value="PERCENTAGE">Percentage</option>
      </select>

      {splitType !== 'EQUAL' && (
        <div className="space-y-2 rounded-xl bg-white p-3">
          {members.map((member) => (
            <label key={member.id} className="flex items-center justify-between gap-2 text-sm">
              <span>{member.name}</span>
              <input
                className="w-32"
                value={values[member.id] ?? ''}
                placeholder={splitType === 'CUSTOM' ? 'Amount' : '%'}
                onChange={(e) => setValues((prev) => ({ ...prev, [member.id]: e.target.value }))}
              />
            </label>
          ))}
          <p className="text-xs text-slate-500">
            Total entered: {sum.toFixed(2)} {splitType === 'PERCENTAGE' ? '%' : 'NGN'}
          </p>
        </div>
      )}
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button className="w-full rounded-lg bg-brand py-2 text-white">Create bill</button>
    </form>
  );
}
