import Link from 'next/link';

const features = [
  {
    title: 'Microservice architecture',
    description: 'A gateway, user service, and task service keep responsibilities separate and easy to scale.'
  },
  {
    title: 'Secure authentication',
    description: 'JWT-based authentication with bcrypt password hashing and route protection on the client and server.'
  },
  {
    title: 'Task operations',
    description: 'Create, update, delete, and track task status from a responsive dashboard experience.'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-10">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            TaskFlow microservice platform
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-heading text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Manage tasks with a clean microservice system.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              TaskFlow combines a Next.js frontend, an Express API gateway, independent auth and task services, and a MySQL database into a practical production-style architecture.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">
              Get started
            </Link>
            <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl sm:p-8">
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Frontend</p>
              <p className="mt-2 text-2xl font-semibold text-white">Next.js + Tailwind CSS</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Gateway</p>
                <p className="mt-2 text-xl font-semibold text-white">localhost:5000</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Database</p>
                <p className="mt-2 text-xl font-semibold text-white">MySQL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glow">
            <h2 className="font-heading text-2xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-3 text-slate-400">{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}