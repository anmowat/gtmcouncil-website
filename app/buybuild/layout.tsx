import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy vs. Build — GTM Stack | GTM Council",
  description:
    "A framework for CEOs and CROs on what to build, what to buy, and how to win with AI in go-to-market. Based on input from 150+ RevOps leaders.",
};

export default function BuyBuildLayout({ children }: { children: React.ReactNode }) {
  return children;
}
