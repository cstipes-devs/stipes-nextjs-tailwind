export function Section({ title, eyebrow, children }:{ title:string; eyebrow?:string; children:React.ReactNode }) {
  return (
    <section className="container-narrow mt-16">
      {eyebrow && <div className="text-sm uppercase tracking-widest text-zinc-500">{eyebrow}</div>}
      <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

