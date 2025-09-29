export function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="container-narrow flex flex-wrap items-center justify-between gap-4 py-4">
        <a href="#top" className="font-semibold tracking-tight" aria-label="Chris Stipes home">
          Chris Stipes
        </a>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm text-zinc-300 sm:gap-4" aria-label="Main navigation">
          <a className="hover:text-white" href="/about">
            About
          </a>
          <a className="hover:text-white" href="#blog">
            Blog / Case Studies
          </a>
          <a className="hover:text-white" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a
            className="rounded-full border border-zinc-700 px-4 py-1.5 font-medium text-zinc-200 shadow-soft transition hover:border-zinc-500 hover:text-white"
            href="/resume.pdf"
            aria-label="Download resume PDF"
          >
            Download Resume (PDF)
          </a>
          <a
            href="mailto:chris.stipes@gmail.com"
            className="rounded-full bg-white px-4 py-1.5 font-medium text-black shadow-soft transition hover:bg-white/90"
            aria-label="Contact Chris Stipes via email"
          >
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
}
