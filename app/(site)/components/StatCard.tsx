export function StatCard({ label, value }:{ label:string; value:string; }) {
  return (
    <div className="card p-6">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-zinc-400">{label}</div>
    </div>
  );
}

