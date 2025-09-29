export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800">
      <div className="container-narrow py-12 text-sm text-zinc-400">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-lg font-semibold text-white">Let's start a project</h2>
            <form
              className="mt-6 grid gap-4"
              action="mailto:chris.stipes@gmail.com"
              method="post"
              encType="text/plain"
            >
              <label className="grid gap-2 text-left">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Name</span>
                <input
                  className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-2 text-left">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Email</span>
                <input
                  className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="grid gap-2 text-left">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Message</span>
                <textarea
                  className="h-28 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40"
                  name="message"
                  placeholder="Tell me more about what you're building"
                  required
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-soft transition hover:bg-white/90"
              >
                Send message
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-3 text-left text-zinc-300">
            <p className="text-base font-semibold text-white">Contact</p>
            <p>
              Email:
              <a className="link ml-2" href="mailto:chris.stipes@gmail.com">chris.stipes@gmail.com</a>
            </p>
            <p>Hoover, AL / Remote</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Chris Stipes. Built with Next.js & Tailwind.</p>
          <a className="link" href="https://github.com/cstipes-devs" target="_blank" rel="noreferrer noopener">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
