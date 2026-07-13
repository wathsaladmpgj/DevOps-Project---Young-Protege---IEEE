"use client";

import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import type { Task, TaskStatus } from '../lib/types';

const emptyForm = {
  title: '',
  description: '',
  status: 'pending' as TaskStatus
};

const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed'
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectedTask = useMemo(() => tasks.find((task) => task.id === selectedTaskId) || null, [tasks, selectedTaskId]);

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data || []);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Unable to load tasks';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTasks();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      setForm({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status
      });
    } else {
      setForm(emptyForm);
    }
  }, [selectedTask]);

  const resetForm = () => {
    setSelectedTaskId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status
    };

    try {
      if (selectedTaskId) {
        await api.put(`/tasks/${selectedTaskId}`, payload);
      } else {
        await api.post('/tasks', payload);
      }

      await loadTasks();
      resetForm();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Task operation failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    const confirmed = window.confirm('Delete this task?');

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      await loadTasks();
      if (selectedTaskId === taskId) {
        resetForm();
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Unable to delete task';
      setError(message);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow backdrop-blur-xl sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Task workspace</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-white">{selectedTaskId ? 'Edit task' : 'New task'}</h2>
          <p className="mt-2 text-sm text-slate-400">Create, update, and track work without leaving the dashboard.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Title</label>
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/8"
              placeholder="Plan sprint review"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Description</label>
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/8"
              placeholder="Add details, dependencies, or notes."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Status</label>
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value as TaskStatus })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50 focus:bg-white/8"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {error && <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Saving...' : selectedTaskId ? 'Update task' : 'Create task'}
            </button>
            {selectedTaskId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Task list</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-white">Your tasks</h2>
          </div>
          <button
            type="button"
            onClick={loadTasks}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
            No tasks yet. Create your first task to get started.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5 text-left text-sm uppercase tracking-[0.18em] text-slate-300">
                <tr>
                  <th className="px-4 py-4">Task</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Created</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-slate-950/20">
                {tasks.map((task) => (
                  <tr key={task.id} className="align-top transition hover:bg-white/5">
                    <td className="px-4 py-4">
                      <div className="max-w-sm">
                        <p className="font-medium text-white">{task.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{task.description || 'No description provided.'}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-200">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${task.status === 'completed' ? 'bg-emerald-400/15 text-emerald-200' : task.status === 'in_progress' ? 'bg-amber-400/15 text-amber-200' : 'bg-slate-400/15 text-slate-200'}`}>
                        {statusLabels[task.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">{new Date(task.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTaskId(task.id)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(task.id)}
                          className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}