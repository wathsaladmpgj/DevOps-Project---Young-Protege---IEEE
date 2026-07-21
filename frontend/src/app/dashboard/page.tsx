"use client";

import { useEffect, useMemo, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import StatCard from '../../components/StatCard';
import { authApi, taskApi } from '../../lib/api';
import type { Task, User } from '../../lib/types';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profileResponse, tasksResponse] = await Promise.all([authApi.get('/profile'), taskApi.get('/tasks')]);
        setUser(profileResponse.data.data);
        setTasks(tasksResponse.data.data || []);
      } catch (requestError) {
        const message = requestError instanceof Error ? requestError.message : 'Unable to load dashboard';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const inProgress = tasks.filter((task) => task.status === 'in_progress').length;

    return { total, completed, inProgress };
  }, [tasks]);

  return (
    <ProtectedRoute>
      <div className="space-y-8 py-4">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Dashboard</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">
            {user ? `Welcome back, ${user.name}` : 'Welcome back'}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Track your work, manage your task queue, and keep the system organized from one place.
          </p>
        </section>

        {error && <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <section className="grid gap-5 md:grid-cols-3">
          <StatCard label="Total Tasks" value={loading ? '...' : stats.total} description="Tasks created under your account" />
          <StatCard label="In Progress" value={loading ? '...' : stats.inProgress} description="Tasks currently being worked on" />
          <StatCard label="Completed" value={loading ? '...' : stats.completed} description="Tasks marked as done" />
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Recent tasks</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-white">Latest activity</h2>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
              Loading dashboard data...
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
              No tasks yet. Create your first task from the Tasks page.
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {tasks.slice(0, 6).map((task) => (
                <article key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{task.description || 'No description provided.'}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${task.status === 'completed' ? 'bg-emerald-400/15 text-emerald-200' : task.status === 'in_progress' ? 'bg-amber-400/15 text-amber-200' : 'bg-slate-400/15 text-slate-200'}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
                    Created {new Date(task.created_at).toLocaleDateString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
}