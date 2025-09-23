export function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="container-narrow flex items-center justify-between py-4">
        <a href="#" className="font-semibold tracking-tight">Chris Stipes</a>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <a className="hover:text-white" href="#work">Work</a>
          <a className="hover:text-white" href="#blog">Blog</a>
          <a className="hover:text-white" href="/about">About</a>
          <a className="hover:text-white" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a
            href="mailto:chris.stipes@gmail.com"
            className="ml-2 rounded-full bg-white px-4 py-1.5 font-medium text-black shadow-soft hover:bg-white/90"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </div>
  );
}
