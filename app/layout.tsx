import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chris Stipes — Software Engineering Leader",
  description: "Minimal portfolio inspired layout built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
