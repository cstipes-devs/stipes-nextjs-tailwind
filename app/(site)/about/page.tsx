import Link from "next/link";
import { RESUME_PATH } from "@/lib/site";

export default function AboutPage() {
  return (
    <main className="container-narrow py-10">
      <div className="max-w-none">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 text-black shadow-soft">
          <div>
            <h1 className="m-0 text-3xl font-semibold tracking-tight">About</h1>
            <p className="mt-2 text-zinc-600">Résumé</p>
          </div>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open resume PDF in new tab"
            className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white shadow-soft transition hover:bg-black/80"
          >
            Open PDF ↗
          </a>
        </div>
        {/* <object> falls back to its children where the browser can't render
            PDFs inline (most mobile browsers), so the fallback must keep a
            working link to the file. */}
        <object
          data={`${RESUME_PATH}#view=FitH`}
          type="application/pdf"
          aria-label="Résumé PDF"
          className="h-[60vh] w-full rounded-2xl border border-zinc-200 bg-white shadow-soft sm:h-[80vh]"
        >
          <div className="flex h-full items-center justify-center p-6 text-center text-black">
            <p>
              Your browser can&apos;t display the PDF inline.{" "}
              <a href={RESUME_PATH} className="font-medium underline">
                Download the résumé
              </a>
              .
            </p>
          </div>
        </object>
        <div className="mt-8">
          <Link href="/" className="badge hover:border-zinc-600">← Back home</Link>
        </div>
      </div>
    </main>
  );
}
