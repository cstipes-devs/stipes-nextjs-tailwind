export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800">
      <div className="container-narrow py-10 text-sm text-zinc-400">
        © {new Date().getFullYear()} Chris Stipes. Built with Next.js & Tailwind •
        <a className="link ml-1" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
      </div>
    </footer>
  );
}

