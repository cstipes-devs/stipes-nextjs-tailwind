import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container-narrow py-10">
      <div className="max-w-none">
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h1 className="m-0 text-3xl font-semibold tracking-tight">About</h1>
          <p className="mt-2 text-zinc-400">Résumé</p>
        </div>
        <article className="card p-6 bg-white text-black border-zinc-200">
          <h2 className="text-2xl font-semibold tracking-tight">CHRISTOPHER STIPES</h2>
          <div className="mt-1 text-zinc-600">Engineering Leader</div>

          <div className="mt-4 grid gap-1 text-sm">
            <a className="link text-zinc-800 hover:text-black" href="mailto:chris.stipes@gmail.com">chris.stipes@gmail.com</a>
            <a className="link text-zinc-800 hover:text-black" href="tel:+12059999781">+12059999781</a>
            <a className="link text-zinc-800 hover:text-black" href="https://www.linkedin.com/in/chris-stipes-186ab033" target="_blank" rel="noreferrer noopener">linkedin.com/in/chris-stipes-186ab033</a>
            <div className="text-zinc-600">Birmingham, AL</div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Experience</h3>
            <div className="mt-4">
              <div className="text-lg font-medium">Digital Receipts Tech Lead</div>
              <div className="text-zinc-600">Fetch Rewards • 05/2024 - 07/2025</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
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
              <div className="text-zinc-600">Unknown • 11/2022 - 05/2024 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
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
              <div className="text-zinc-600">Shipt • 10/2020 - 11/2022 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
                <li>Led a cross-functional team of 10 engineers (mobile, web, backend, data) to deliver scalable ad-tech platforms</li>
                <li>Re-architected systems for high availability and multivendor support</li>
                <li>Introduced contract/schema validation at build time, embedding quality into CI/CD pipelines</li>
                <li>Increased ad revenue ~15% through product reliability and placement optimizations</li>
                <li>Drove adoption of modern QA tools (Cypress, Detox, Postman replacements) and mentored engineers on quality-first practices</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-lg font-medium">QA Manager/SDET</div>
              <div className="text-zinc-600">06/2018 - 10/2019 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
                <li>Introduced Cypress and Detox for end-to-end testing across platforms</li>
                <li>Replaced Postman-based testing with embedded test frameworks for backend services</li>
                <li>Built Locust + Grafana load testing framework integrated with CI/CD reporting</li>
                <li>Designed automated data validation system for product ingestion and search relevance</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-lg font-medium">Lead SDET</div>
              <div className="text-zinc-600">Guidewire Software • 06/2015 - 06/2018 • Birmingham, AL</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
                <li>Improved testing efficiency by 25% by developing a new automation framework for mobile and web using Appium and Selenium.</li>
                <li>Created Excel-based automated test data tooling for recurring test scenarios.</li>
                <li>Integrated performance and load testing (Artillery) into microservice templates.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Education</h3>
            <div className="mt-2 text-zinc-800">B.a</div>
            <div className="text-zinc-600">University of Alabama - B.A • 2007</div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Summary</h3>
            <p className="mt-2 text-zinc-700">
              QUALITY ENGINEERING LEADER Backend Engineering | QA &amp; Automation Strategy | CI/CD | Scaling Teams &amp; Systems | Observability
              Engineering leader with 12+ years of experience across backend, QA, and mobile engineering. Proven expertise in establishing QA/QE best practices, implementing robust test automation frameworks, integrating testing into CI/CD pipelines, and driving quality metrics across organizations. Skilled in stakeholder management, cross-functional collaboration, and scaling teams to deliver reliable, high-performing software solutions.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">KEY IMPACTS</h3>
            <div className="mt-3 space-y-3">
              <div>
                <div className="font-medium">Receipt Processing Enhancement</div>
                <p className="text-zinc-600">Increased daily receipt ingestion by 50%, processing 2 million orders with 1 million distinct users a day.</p>
              </div>
              <div>
                <div className="font-medium">Ad Revenue Growth</div>
                <p className="text-zinc-600">Boosted ad revenue by 15% through new ad partner integration and CMS layer to add placements without code changes.</p>
              </div>
              <div>
                <div className="font-medium">Data Quality Improvements</div>
                <p className="text-zinc-600">Optimized data ingestion monitoring with real-time checks for fields to drastically improve downstream purchase data quality for partners.</p>
              </div>
              <div>
                <div className="font-medium">Mobile Release Optimizations</div>
                <p className="text-zinc-600">Streamlined QA workflows, leading to 30% faster defect resolution times and improved team efficiency.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">LANGUAGES AND FRAMEWORKS</h3>
            <ul className="mt-2 grid list-disc grid-cols-1 gap-1 pl-5 text-zinc-800 sm:grid-cols-2 md:grid-cols-3">
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
