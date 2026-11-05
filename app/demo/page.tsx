import { getDemoSubmissions, getDemoVoteCounts } from "@/lib/airtable";
import { getDemoSession } from "@/lib/auth";
import DemoClient from "./DemoClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demo Day | GTM Council",
  description: "Watch and vote for the best GTM vendor demos. Product Hunt-style voting, open to everyone.",
};

export default async function DemoPage() {
  const [submissions, voteCounts, session] = await Promise.all([
    getDemoSubmissions(),
    getDemoVoteCounts(),
    getDemoSession(),
  ]);

  return (
    <DemoClient
      submissions={submissions}
      initialVoteCounts={voteCounts}
      initialEmail={session?.email ?? null}
    />
  );
}
