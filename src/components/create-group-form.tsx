'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function CreateGroupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pin })
    });

    if (!res.ok) {
      setError('Could not create group. Check your input and try again.');
      return;
    }

    const group = await res.json();
    localStorage.setItem(`owner:${group.id}`, '1');
    router.push(`/groups/${group.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold">Create group</h2>
      <input
        required
        placeholder="Group name (e.g. Lekki Brunch)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full"
      />
      <input
        placeholder="Optional 4-digit PIN"
        inputMode="numeric"
        maxLength={4}
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        className="w-full"
      />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button className="w-full rounded-lg bg-brand py-2 text-white">Create</button>
    </form>
  );
}
