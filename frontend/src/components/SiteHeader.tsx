"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearSession, getStoredUser, getToken } from '../lib/auth';
import type { User } from '../lib/types';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/profile', label: 'Profile' }
];

export default function SiteHeader() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const refreshAuthState = () => {
      const user = getStoredUser();
      setIsAuthenticated(Boolean(user));
      setCurrentUser(user);
    };

    refreshAuthState();
    window.addEventListener('storage', refreshAuthState);
    return () => window.removeEventListener('storage', refreshAuthState);
  }, []);

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setCurrentUser(null);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 shadow-glow ring-1 ring-cyan-300/20">
            TM
          </div>
          <div>
            <p className="font-heading text-lg font-semibold tracking-tight text-white">TaskFlow</p>
            <p className="text-xs text-slate-400">Microservice task management</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-300 md:inline-flex">
                {currentUser?.name || 'User'}
              </span>
              <nav className="hidden items-center gap-2 lg:flex">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/8 hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-white px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/8 hover:text-white">
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-white px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}