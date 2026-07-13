"use client";

import { useState } from 'react';

type AuthMode = 'login' | 'register';

type AuthFormPayload = {
  name?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: AuthMode;
  onSubmit: (payload: AuthFormPayload) => Promise<void>;
};

const formCopy = {
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to manage tasks, update progress, and review your dashboard.',
    submitLabel: 'Login'
  },
  register: {
    title: 'Create your account',
    subtitle: 'Register once and start managing tasks in a secure workspace.',
    submitLabel: 'Register'
  }
} as const;

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const copy = formCopy[mode];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit({
        name: mode === 'register' ? name : undefined,
        email,
        password
      });
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl sm:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">TaskFlow</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-white">{copy.title}</h1>
        <p className="mt-3 text-slate-400">{copy.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'register' && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Full name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/8"
              placeholder="Alex Morgan"
              required
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/8"
            placeholder="alex@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/8"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        {error && <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Please wait...' : copy.submitLabel}
        </button>
      </form>
    </div>
  );
}