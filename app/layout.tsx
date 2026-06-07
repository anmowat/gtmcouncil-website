import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "GTM Council | Community for GTM Operations Leaders",
  description:
    "The GTM Council is built to support the modern GTM Operational leader. Our community connects members to the most innovative vendors to grow careers and lead the evolution of GTM technology.",
  openGraph: {
    title: "GTM Council",
    description:
      "AI will rewire the GTM motion. GTM Council is an exclusive community of the top 100+ GTM operators sharing insights and helping shape how GTM will evolve.",
    siteName: "GTM Council",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
