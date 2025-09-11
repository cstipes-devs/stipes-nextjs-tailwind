export function Hero() {
  return (
    <section className="container-narrow pt-16 md:pt-24">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
        <div className="h-24 w-24 shrink-0 rounded-xl border border-zinc-800 bg-zinc-900"></div>
        <div>
          <div className="badge">Software Engineering Leader</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Systems at scale. Quality by design.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            I build reliable, observable platforms and lead teams to ship with confidence—
            from mobile to backend to data pipelines.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="badge hover:border-zinc-600" href="#projects">View Projects →</a>
            <a className="badge hover:border-zinc-600" href="mailto:chris.stipes@gmail.com">Get in touch</a>
            <a className="badge hover:border-zinc-600" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}

