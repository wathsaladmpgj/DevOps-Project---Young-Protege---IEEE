"use client";

import ProtectedRoute from '../../components/ProtectedRoute';
import TaskManager from '../../components/TaskManager';

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8 py-4">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Tasks</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">Manage your task lifecycle</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Create, edit, update status, and delete tasks from a single workspace that talks directly to the task service.
          </p>
        </section>

        <TaskManager />
      </div>
    </ProtectedRoute>
  );
}