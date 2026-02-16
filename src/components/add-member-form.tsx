'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function AddMemberForm({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/groups/${groupId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });
    if (!res.ok) {
      setError('Could not add member.');
      return;
    }
    setName('');
    setPhone('');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 rounded-xl bg-white p-3 shadow-sm">
      <h3 className="font-medium">Add member</h3>
      <input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
      <input placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button className="w-full rounded-lg bg-slate-900 py-2 text-white">Add member</button>
    </form>
  );
}
