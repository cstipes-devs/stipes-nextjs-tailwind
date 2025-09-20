import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container-narrow py-10">
      <div className="max-w-none">
        <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 text-black shadow-soft">
          <h1 className="m-0 text-3xl font-semibold tracking-tight">About</h1>
          <p className="mt-2 text-zinc-600">Résumé</p>
        </div>
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 text-black shadow-soft">
          <div className="p-0">
            <h2 className="text-2xl font-semibold tracking-tight">CHRISTOPHER STIPES</h2>
            <div className="mt-1 text-zinc-600">Engineering Leader</div>

            <div className="mt-4 grid gap-1 text-sm">
              <div className="inline-flex items-center gap-2 font-semibold text-black">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 4h16v16H4z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                chris.stipes@gmail.com
              </div>
              <div className="inline-flex items-center gap-2 font-semibold text-black">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.08 4.18 2 2 0 014.06 2h3a2 2 0 012 1.72c.12.9.33 1.78.62 2.63a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0122 16.92z"/>
                </svg>
                +12059999781
              </div>
              <div className="inline-flex items-center gap-2 font-semibold text-black">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5z" transform="translate(4 4)"/>
                  <path d="M0 8h3v12H0zM5 8h2.8v1.7h.04c.39-.7 1.35-1.44 2.78-1.44C13.62 8.26 15 9.8 15 12.3V20H12v-6.5c0-1.55-.55-2.6-1.93-2.6-1.05 0-1.67.71-1.95 1.4-.1.24-.12.57-.12.9V20H5V8z" transform="translate(4 2)"/>
                </svg>
                linkedin.com/in/chris-stipes-186ab033
              </div>
              <div className="text-zinc-600 inline-flex items-center gap-2">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Birmingham, AL
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Experience</h3>
            <div className="mt-4">
              <div className="text-lg font-medium">Digital Receipts Tech Lead</div>
              <div className="text-zinc-700">Fetch Rewards • 05/2024 - 07/2025</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-800 leading-relaxed">
                <li>Scaled receipt ingestion pipeline to process 1.5-2M digital orders daily, delivering a high-performing and reliable data product</li>
                <li>Reduced incidents from multiple per month to near-zero by enforcing observability, automation, and CI/CD quality validation</li>
                <li>Partnered across backend, ML, mobile, and data teams to enforce cross-team QA/QE standards</li>
                <li>Defined and tracked quality metrics (release stability, defect escape rate, hotfix frequency) to ensure system reliability</li>
                <li>Dockerized Go-based integration tests, embedding them into CI/CD pipelines</li>
                <li>Built a real-world data library for receipts by leveraging customer event streams into Snowflake, enabling robust automated test data setup</li>
                <li>Presented monthly at company-wide tech all-hands with Grafana dashboards to highlight KPIs, improvements, and challenges impacting quality metrics</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-lg font-medium">Director of Quality Engineering / SDET</div>
              <div className="text-zinc-700">Fetch Rewards • 11/2022 - 05/2024 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-800 leading-relaxed">
                <li>Directed a QA organization of 40+ staff and 4 managers, implementing best practices and leading automation initiatives.</li>
                <li>Established automation testing frameworks (Appium, Playwright, Go/Python), integrating them into CI/CD pipelines for continuous validation.</li>
                <li>Built a scalable test environment strategy, driving cross-platform testing across iOS, Android, backend, and web applications.</li>
                <li>Oversaw the automation of regression and sanity test suites, enhancing reliable coverage and streamlining regression cycles.</li>
                <li>Led POCs for new automation frameworks, scaling successful pilots and delivering hands off test data setup systems.</li>
                <li>Established human-readable reporting of test results to Slack and Jira, ensuring visibility and faster issue resolution.</li>
                <li>Acted as a liaison with product, engineering, and business teams to ensure alignment and collaboration.</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-lg font-medium">Engineering Manager</div>
              <div className="text-zinc-700">Shipt • 10/2020 - 11/2022 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-800 leading-relaxed">
                <li>Led a cross-functional team of 10 engineers (mobile, web, backend, data) to deliver scalable ad-tech platforms</li>
                <li>Re-architected systems for high availability and multivendor support</li>
                <li>Introduced contract/schema validation at build time, embedding quality into CI/CD pipelines</li>
                <li>Increased ad revenue ~15% through product reliability and placement optimizations</li>
                <li>Drove adoption of modern QA tools (Cypress, Detox, Postman replacements) and mentored engineers on quality-first practices</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-lg font-medium">QA Manager/SDET</div>
              <div className="text-zinc-700">Shipt 06/2018 - 10/2019 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-800 leading-relaxed">
                <li>Introduced Cypress and Detox for end-to-end testing across platforms</li>
                <li>Replaced Postman-based testing with embedded test frameworks for backend services</li>
                <li>Built Locust + Grafana load testing framework integrated with CI/CD reporting</li>
                <li>Designed automated data validation system for product ingestion and search relevance</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-lg font-medium">Lead SDET</div>
              <div className="text-zinc-700">Guidewire Software • 06/2015 - 06/2018 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-800 leading-relaxed">
                <li>Improved testing efficiency by 25% by developing a new automation framework for mobile and web using Appium and Selenium.</li>
                <li>Created Excel-based automated test data tooling for recurring test scenarios.</li>
                <li>Integrated performance and load testing (Artillery) into microservice templates.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Education</h3>
            <div className="mt-2 text-zinc-900">B.a</div>
            <div className="text-zinc-700">University of Alabama - B.A • 2007</div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Summary</h3>
            <p className="mt-2 text-zinc-800 leading-relaxed">
              QUALITY ENGINEERING LEADER Backend Engineering | QA &amp; Automation Strategy | CI/CD | Scaling Teams &amp; Systems | Observability
              Engineering leader with 12+ years of experience across backend, QA, and mobile engineering. Proven expertise in establishing QA/QE best practices, implementing robust test automation frameworks, integrating testing into CI/CD pipelines, and driving quality metrics across organizations. Skilled in stakeholder management, cross-functional collaboration, and scaling teams to deliver reliable, high-performing software solutions.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">KEY IMPACTS</h3>
            <div className="mt-3 space-y-3">
              <div>
                <div className="font-medium">Receipt Processing Enhancement</div>
                <p className="text-zinc-700">Increased daily receipt ingestion by 50%, processing 2 million orders with 1 million distinct users a day.</p>
              </div>
              <div>
                <div className="font-medium">Ad Revenue Growth</div>
                <p className="text-zinc-700">Boosted ad revenue by 15% through new ad partner integration and CMS layer to add placements without code changes.</p>
              </div>
              <div>
                <div className="font-medium">Data Quality Improvements</div>
                <p className="text-zinc-700">Optimized data ingestion monitoring with real-time checks for fields to drastically improve downstream purchase data quality for partners.</p>
              </div>
              <div>
                <div className="font-medium">Mobile Release Optimizations</div>
                <p className="text-zinc-700">Streamlined QA workflows, leading to 30% faster defect resolution times and improved team efficiency.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">LANGUAGES AND FRAMEWORKS</h3>
            <ul className="mt-2 grid list-disc grid-cols-1 gap-1 pl-5 text-zinc-800 leading-relaxed sm:grid-cols-2 md:grid-cols-3">
              <li>Go</li>
              <li>Python</li>
              <li>AWS</li>
              <li>Ruby</li>
              <li>Docker</li>
              <li>End-To-End Testing</li>
              <li>GitHub</li>
              <li>Grafana</li>
              <li>GraphQL</li>
              <li>Java</li>
              <li>Jenkins</li>
              <li>JIRA</li>
              <li>Kafka</li>
              <li>Kubernetes</li>
              <li>Load Testing</li>
              <li>PostgreSQL</li>
              <li>Python</li>
              <li>Redis</li>
              <li>Ruby</li>
              <li>Scrum</li>
              <li>Selenium</li>
              <li>Slack</li>
              <li>Snowflake</li>
              <li>GitHub Actions</li>
              <li>Microservices</li>
              <li>gRPC</li>
              <li>Appium</li>
              <li>DynamoDB</li>
              <li>In-Memory Caches</li>
            </ul>
          </div>
        </article>
        <div className="mt-8">
          <Link href="/" className="badge hover:border-zinc-600">← Back home</Link>
        </div>
      </div>
    </main>
  );
}
