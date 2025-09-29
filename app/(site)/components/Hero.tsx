import Image from "next/image";

export function Hero() {
  return (
    <section className="container-narrow pt-16 md:pt-24">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
        <Image
          src="/profile.png"
          alt="Chris Stipes, engineering leader"
          width={640}
          height={1024}
          sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 10rem"
          priority
          className="w-40 md:w-64 lg:w-80 h-auto shrink-0 rounded-xl border border-zinc-800 shadow-lg shadow-black/40 ring-1 ring-zinc-700/40"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Chris Stipes</h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-400 md:text-base md:tracking-[0.35em]">
            Engineering Leader • Systems at Scale • Quality by Design
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-200 shadow-soft transition hover:border-zinc-500 hover:text-white"
              href="/ChristopherStipesResume_v3.pdf"
              aria-label="Download resume PDF"
            >
              Download Resume (PDF)
            </a>
            <a
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black shadow-soft transition hover:bg-white/90"
              href="mailto:chris.stipes@gmail.com"
              aria-label="Contact Chris Stipes via email"
            >
              Let's Talk
            </a>
          </div>
          <p className="mt-4 text-base font-semibold text-zinc-100 md:text-lg">Let's work together to build reliable systems.</p>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Engineering leader with 12+ years of experience across backend, platform, QA, and mobile engineering. I scale teams, modernize infrastructure, and build resilient, observable, and secure systems—integrating with external providers, driving API interoperability, and architecting AWS serverless data pipelines. Passionate about developer velocity, testing in production, and building high-impact platforms; hands-on with a people-first leadership style.
          </p>
        </div>
      </div>
    </section>
  );
}
