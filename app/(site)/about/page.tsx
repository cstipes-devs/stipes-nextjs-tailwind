import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container-narrow py-10">
      <div className="max-w-none">
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h1 className="m-0 text-3xl font-semibold tracking-tight">About</h1>
          <p className="mt-2 text-zinc-400">Résumé</p>
        </div>
        <article className="card p-6">
          <p>Chris Stipes</p>
          <p>
            Birmingham, AL • <a className="link" href="mailto:chris.stipes@gmail.com">chris.stipes@gmail.com</a> • (205) 999-9781 •
            <a className="link" href="https://www.linkedin.com/in/chris-stipes-186ab033" target="_blank" rel="noreferrer noopener"> linkedin.com/in/chris-stipes-186ab033</a> •
            <a className="link" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener"> github.com/cstipes-devs</a>
          </p>
          <div className="h-3" />
          <p>ENGINEERING LEADER</p>
          <p>Backend &amp; Platform Engineering | Scaling Teams &amp; Systems | Quality &amp; Reliability | Observability | GenAI Readiness</p>
          <div className="h-3" />
          <p>Engineering leader with 12+ years across backend, platform, QA, and mobile. Scaled teams, modernized infra, and built resilient, observable systems. Passionate about developer velocity, testing in production, and high-impact platforms. Recently focused on integrating Generative AI into quality, automation, and performance strategies.</p>
          <div className="h-3" />
          <p>CORE SKILLS</p>
          <p>- Programming &amp; Frameworks: Go, Python, Ruby, JavaScript, gRPC/Protobuf, GraphQL</p>
          <p>- Quality &amp; Automation: Playwright, Appium, Cypress, Detox, Selenium, Postman, custom Go/Python test frameworks</p>
          <p>- Performance &amp; Reliability: Locust, Grafana k6, Artillery, Observability-driven testing, CI/CD quality gates</p>
          <p>- Cloud &amp; Platforms: AWS (S3, Lambda, SNS/SQS), Docker, Microservices, Snowflake</p>
          <p>- GenAI &amp; Data: Prompt engineering, ML/AI quality validation, LLM-based test design (emerging), Python-based ML benchmarking tools</p>
          <div className="h-3" />
          <p>EXPERIENCE</p>
          <p>Fetch Rewards — Digital Receipts Tech Lead / Backend Engineer (May 2024 – Jul 2025)</p>
          <p>- Scaled system to process 1.5–2M digital orders daily; market-ready data product.</p>
          <p>- Reduced incident frequency from multiple per month to near-zero; improved reliability.</p>
          <p>- Doubled iOS/Android user share from 18% to 39% of active users.</p>
          <p>- Created a Python-based ML benchmarking tool for receipt model accuracy.</p>
          <div className="h-3" />
          <p>Fetch Rewards — Director of Quality Engineering / SDET (Nov 2022 – May 2024)</p>
          <p>- Directed QA org of 40+; led managers and senior ICs.</p>
          <p>- Weekly release cadence across iOS and Android.</p>
          <p>- Observability-driven testing in production workflows.</p>
          <p>- Adopted Appium, Playwright, and Go/Python data testing frameworks.</p>
          <div className="h-3" />
          <p>Shipt — Engineering Manager / Backend Engineer (Oct 2020 – Nov 2022)</p>
          <p>- Re-architected Ad-tech platform for multi-vendor mediation &amp; HA.</p>
          <p>- Improved relevancy &amp; placements; ~15% ad revenue growth.</p>
          <p>- Drove GraphQL adoption; contract/schema validation at build.</p>
          <p>- Doubled team size via hiring &amp; mentorship.</p>
          <div className="h-3" />
          <p>Shipt — Senior Backend Engineer (Oct 2019 – Oct 2020)</p>
          <p>- Rebuilt 'Shelf' in Go as a headless CMS; 20% performance gain.</p>
          <p>- Partnered with Data Science for faster recommendations.</p>
          <p>- CMS tooling for non-engineer content launches.</p>
          <p>- Migrated large portions of Ruby monolith to microservices.</p>
          <div className="h-3" />
          <p>Shipt — QA Manager / SDET (Jun 2018 – Oct 2019)</p>
          <p>- Replaced Postman tests with embedded microservice frameworks.</p>
          <p>- Introduced Cypress and Detox E2E testing.</p>
          <p>- Built Locust + Grafana load framework integrated in service reports.</p>
          <p>- UI-driven data validation for ingestion &amp; relevance.</p>
          <div className="h-3" />
          <p>Guidewire Software — Lead SDET (Jun 2015 – Jun 2018)</p>
          <p>- Built first mobile + web automation (Appium + Selenium, Java).</p>
          <p>- Excel tooling for non-technical test data generation.</p>
          <p>- Artillery load testing integrated into templates.</p>
          <div className="h-3" />
          <p>EDUCATION</p>
          <p>University of Alabama — B.A., 2007</p>
        </article>
        <div className="mt-8">
          <Link href="/" className="badge hover:border-zinc-600">← Back home</Link>
        </div>
      </div>
    </main>
  );
}

