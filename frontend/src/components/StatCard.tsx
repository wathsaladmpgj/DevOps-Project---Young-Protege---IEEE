type StatCardProps = {
  label: string;
  value: string | number;
  description: string;
};

export default function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-sm">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">{label}</p>
      <p className="mt-3 font-heading text-4xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}