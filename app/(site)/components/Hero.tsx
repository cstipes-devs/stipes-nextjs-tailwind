import Image from "next/image";

export function Hero() {
  return (
    <section className="container-narrow pt-16 md:pt-24">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
        <Image
          src="/profile.png"
          alt="Profile photo of Chris Stipes"
          width={128}
          height={128}
          priority
          className="h-32 w-32 shrink-0 rounded-xl border border-zinc-800 object-cover shadow-lg shadow-black/40 ring-1 ring-zinc-700/40"
        />
        <div>
          <div className="badge">Software Engineering Leader</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Systems at scale. Quality by design.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Engineering leader with 12+ years of experience across backend, platform, QA, and mobile engineering. I scale teams, modernize infrastructure, and build resilient, observable, and secure systems—integrating with external providers, driving API interoperability, and architecting AWS serverless data pipelines. Passionate about developer velocity, testing in production, and building high-impact platforms; hands-on with a people-first leadership style.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="badge hover:border-zinc-600" href="mailto:chris.stipes@gmail.com">Get in touch</a>
            <a className="badge hover:border-zinc-600" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
