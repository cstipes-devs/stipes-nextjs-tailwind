import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { StatCard } from "./components/StatCard";
import { ProjectCard } from "./components/ProjectCard";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />

      <div className="container-narrow mt-12 grid gap-6 md:grid-cols-3">
        <StatCard label="Monthly Active Users" value="12M+" />
        <StatCard label="Peak Throughput" value="80k RPS" />
        <StatCard label="Receipts / week" value="80M+" />
      </div>

      <Section title="What I Do" eyebrow="Capabilities">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Distributed Systems & APIs</h3>
            <p className="mt-2 text-zinc-400">
              Designing reliable, observable services with pragmatic interfaces and strong SLOs.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Quality & Performance Engineering</h3>
            <p className="mt-2 text-zinc-400">
              Shift-left testing, automation-first practices, and performance baselines baked into CI/CD.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold">ML/AI–adjacent Platforms</h3>
            <p className="mt-2 text-zinc-400">
              Building data pipelines and evaluation loops that turn models into production value.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Team Leadership</h3>
            <p className="mt-2 text-zinc-400">
              Coaching managers and ICs, raising the bar on delivery, standards, and outcomes.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Selected Work" eyebrow="Projects">
        <div className="grid gap-6 md:grid-cols-3">
          <ProjectCard title="Receipt Ingestion" blurb="Low-latency pipelines processing millions/day." />
          <ProjectCard title="Ad Platform Revamp" blurb="Multi-vendor mediation with high availability." />
          <ProjectCard title="Mobile Automation" blurb="Unified Appium harness across iOS/Android." />
        </div>
      </Section>

      <Section title="Writing" eyebrow="Notes">
        <div className="grid gap-6 md:grid-cols-2">
          <a className="card p-6 hover:border-zinc-600 transition" href="#">
            <div className="badge">Architecture</div>
            <h3 className="mt-3 text-xl font-semibold">SLOs that matter</h3>
            <p className="mt-2 text-zinc-400">Picking the right golden signals for your users—not your dashboards.</p>
          </a>
          <a className="card p-6 hover:border-zinc-600 transition" href="#">
            <div className="badge">Quality</div>
            <h3 className="mt-3 text-xl font-semibold">Load testing that sticks</h3>
            <p className="mt-2 text-zinc-400">Keeping perf baselines alive after the first big launch.</p>
          </a>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

