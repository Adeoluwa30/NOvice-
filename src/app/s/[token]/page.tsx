'use client';

import { useEffect, useState } from 'react';
import { koboToNaira } from '@/lib/format';

type Share = {
  token: string;
  amountKobo: number;
  status: 'PAID' | 'UNPAID';
  member: { name: string };
  bill: { title: string | null; group: { name: string } };
};

export default function SharePage({ params }: { params: { token: string } }) {
  const [share, setShare] = useState<Share | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/shares/${params.token}`)
      .then((res) => res.json())
      .then((data) => setShare(data))
      .finally(() => setLoading(false));
  }, [params.token]);

  async function markPaid() {
    await fetch(`/api/shares/${params.token}/mark-paid`, { method: 'POST' });
    const fresh = await fetch(`/api/shares/${params.token}`).then((res) => res.json());
    setShare(fresh);
  }

  if (loading) return <p>Loading...</p>;
  if (!share || (share as any).error) return <p>Invalid link.</p>;

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <h1 className="text-xl font-bold">Hi {share.member.name}</h1>
      <p className="text-sm">Group: {share.bill.group.name}</p>
      <p className="text-sm">Bill: {share.bill.title || 'Untitled bill'}</p>
      <p className="text-lg font-semibold">You owe {koboToNaira(share.amountKobo)}</p>
      {share.status === 'PAID' ? (
        <p className="rounded-lg bg-emerald-100 p-2 text-emerald-700">You’re all set ✅</p>
      ) : (
        <button onClick={markPaid} className="w-full rounded-lg bg-brand py-2 text-white">
          I&apos;ve paid
        </button>
      )}
    </div>
  );
}
