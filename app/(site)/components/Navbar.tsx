export function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="container-narrow flex items-center justify-between py-4">
        <a href="#" className="font-semibold tracking-tight">Chris Stipes</a>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <a className="hover:text-white" href="#work">Work</a>
          <a className="hover:text-white" href="#writing">Writing</a>
          <a className="hover:text-white" href="mailto:chris.stipes@gmail.com">Contact</a>
        	<a className="hover:text-white" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a className="hover:text-white" href="/about">About</a>
        </nav>
      </div>
    </div>
  );
}

