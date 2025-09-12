import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chris Stipes — Software Engineering Leader",
  description: "Engineering leader with 12+ years across backend, platform, QA, and mobile; scales teams, modernizes infrastructure, and builds resilient, observable, secure systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
