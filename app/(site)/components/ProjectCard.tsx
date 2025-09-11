export function ProjectCard({ title, blurb }:{ title:string; blurb:string; }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-400">{blurb}</p>
      <div className="mt-4">
        <a className="link" href="#">Case study →</a>
      </div>
    </div>
  );
}

