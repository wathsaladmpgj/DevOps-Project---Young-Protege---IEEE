"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getStoredUser } from '../../lib/auth';
import type { User } from '../../lib/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Use stored user (no JWT sent to server)
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    } else {
      setError('No user session found');
    }
    setLoading(false);
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-8 py-4">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Profile</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">Account details</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            View the account currently signed in on this device, as tracked by the user service.
          </p>
        </section>

        {error && <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl sm:p-8">
          {loading ? (
            <p className="text-slate-400">Loading profile...</p>
          ) : user ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Name</p>
                <p className="mt-2 text-2xl font-semibold text-white">{user.name}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
                <p className="mt-2 text-2xl font-semibold text-white">{user.email}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5 sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Member since</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Unknown'}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}