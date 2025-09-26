import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { StatCard } from "./components/StatCard";
import { ChatWidget } from "./components/ChatWidget";
import { WipIcon } from "./components/WipIcon";
import { AngledDivider } from "./components/AngledDivider";

export default function Page() {
  return (
    <main id="top">
      <Navbar />
      <Hero />
      <AngledDivider className="my-6 md:my-10" />

      <div className="container-narrow mt-12 grid gap-6 md:grid-cols-2 items-start">
        <div className="grid gap-6" id="work">
          <StatCard label="Peak Throughput" value="80k RPS" />
          <StatCard label="Stable Mobile Releases / year" value="52" hint="Once a week on iOS and Android" />
          <StatCard label="Receipts / week" value="80M+" />
        </div>
        <div className="card p-6">
          <div className="badge">Let’s work together</div>
          <h3 className="mt-3 text-2xl font-semibold">Ready to build reliable systems?</h3>
          <p className="mt-2 text-zinc-400">
            I lead teams to ship stable, scalable platforms with strong SLOs, clean interfaces, and observability-first practices.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-soft hover:bg-white/90" href="mailto:chris.stipes@gmail.com">Email Chris</a>
            <a className="badge hover:border-zinc-600" href="https://www.linkedin.com/in/chris-stipes-186ab033/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
            <a className="badge hover:border-zinc-600" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
          </div>
        </div>
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

      <Section title="Core Skills" eyebrow="CORE SKILLS">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 16L5 12L9 8"/>
                <path d="M15 8L19 12L15 16"/>
                <path d="M13 6L11 18"/>
              </svg>
              <h3 className="text-xl font-semibold">Programming & Frameworks</h3>
            </div>
            <p className="mt-2 text-zinc-400">Go, Python, Ruby, JavaScript, gRPC/Protobuf, GraphQL</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M8 12l3 3 5-6"/>
              </svg>
              <h3 className="text-xl font-semibold">Quality & Automation</h3>
            </div>
            <p className="mt-2 text-zinc-400">Playwright, Appium, Cypress, Detox, Selenium, Postman, custom Go/Python test frameworks</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 14a8 8 0 0116 0"/>
                <path d="M12 14l3-3"/>
                <path d="M12 14v5"/>
              </svg>
              <h3 className="text-xl font-semibold">Performance & Reliability</h3>
            </div>
            <p className="mt-2 text-zinc-400">Locust, Grafana k6, Artillery, Observability-driven testing, CI/CD quality gates</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 16a4 4 0 010-8 5 5 0 019.6 1.2A3.5 3.5 0 1118 16H7z"/>
              </svg>
              <h3 className="text-xl font-semibold">Cloud & Platforms</h3>
            </div>
            <p className="mt-2 text-zinc-400">AWS (S3, Lambda, SNS/SQS), Docker, Microservices, Snowflake</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.8 3.8L18 8.2l-3.2 2.2.9 3.9L12 12.8 8.3 14.3l.9-3.9L6 8.2l4.2-1.4L12 3z"/>
                <path d="M18.5 16l.9 1.8 2 .7-1.7 1.2.5 2-1.7-1-1.7 1 .5-2-1.7-1.2 2-.7.9-1.8z"/>
              </svg>
              <h3 className="text-xl font-semibold">GenAI & Data</h3>
            </div>
            <p className="mt-2 text-zinc-400">Prompt engineering, ML/AI quality validation, LLM-based test design (emerging), Python-based ML benchmarking tools</p>
          </div>
        </div>
      </Section>

      <ChatWidget />

      <div id="blog" />
      <Section title="Blog" eyebrow="Blog">
        <div className="grid gap-6 md:grid-cols-2">
          <a className="card p-6 hover:border-zinc-600 transition" href="/blog/chat-bot">
            <div className="flex items-center justify-between">
              <div className="badge">Case Study</div>
            </div>
            <h3 className="mt-3 text-xl font-semibold">How I built this site and chat bot</h3>
            <p className="mt-2 text-zinc-400">A minimal Go service wrapping OpenAI + a clean Next.js/Tailwind frontend with a wired chat widget.</p>
          </a>
          <a className="card p-6 hover:border-zinc-600 transition" href="#">
            <div className="flex items-center justify-between">
              <div className="badge">Quality</div>
              <WipIcon />
            </div>
            <h3 className="mt-3 text-xl font-semibold">Load testing that sticks</h3>
            <p className="mt-2 text-zinc-400">Keeping perf baselines alive after the first big launch.</p>
          </a>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
