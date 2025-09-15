export function StatCard({ label, value, hint }:{ label:string; value:string; hint?: string; }) {
  return (
    <div className="card p-6">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-zinc-400">{label}</div>
      {hint ? (
        <div className="mt-2 text-sm text-zinc-500">{hint}</div>
      ) : null}
    </div>
  );
}
