import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "GTM / AI Discussions | GTM Council",
  description: "Our members and vendors regularly come together to discuss how the GTM technology landscape is changing.",
};

type SessionType = "Huddle" | "Podcast";

interface Insight {
  id: string;
  company: string;
  companyUrl: string;
  month: string;
  type: SessionType;
  speaker: string;
  speakerUrl: string;
  topic: string;
  embedUrl?: string; // iframe src — leave undefined for password-protected placeholder
}

const TYPE_COLORS: Record<SessionType, string> = {
  Huddle: "#15803d",
  Podcast: "#1d4ed8",
};

const INSIGHTS: Insight[] = [
  {
    id: "6",
    company: "Hyperbound",
    companyUrl: "https://www.hyperbound.ai/",
    month: "Mar 2026",
    type: "Huddle",
    speaker: "Sriharsha (Sai) Guduguntla (CEO)",
    speakerUrl: "https://www.linkedin.com/in/sguduguntla/",
    topic: "AI Roleplays",
    embedUrl: undefined, // password-protected on Vimeo
  },
  {
    id: "5",
    company: "Clay",
    companyUrl: "https://www.clay.com/",
    month: "Mar 2026",
    type: "Podcast",
    speaker: "Everett (Head of GTM Engineering)",
    speakerUrl: "https://www.linkedin.com/in/everettberry/",
    topic: "GTM Engineering",
    embedUrl: "https://player.vimeo.com/video/1172764939?h=5007e561ac&title=0&byline=0&portrait=0",
  },
  {
    id: "3",
    company: "11x",
    companyUrl: "https://www.11x.ai/",
    month: "Feb 2026",
    type: "Podcast",
    speaker: "Prabhav (CEO)",
    speakerUrl: "https://www.linkedin.com/in/jainprabhav/",
    topic: "Agentic SDR",
    embedUrl: "https://player.vimeo.com/video/1168162461?h=9e6a32b65c&title=0&byline=0&portrait=0",
  },
  {
    id: "4",
    company: "Rox",
    companyUrl: "https://www.rox.com/",
    month: "Feb 2026",
    type: "Huddle",
    speaker: "Adam (VP Revenue)",
    speakerUrl: "https://www.linkedin.com/in/adamali1/",
    topic: "Revenue Agents",
    embedUrl: undefined, // password-protected on Vimeo
  },
  {
    id: "1",
    company: "Scalestack",
    companyUrl: "https://scalestack.ai/",
    month: "Jan 2026",
    type: "Huddle",
    speaker: "Elio (CEO)",
    speakerUrl: "https://www.linkedin.com/in/elionarciso/",
    topic: "Enterprise data enrichment and GTM workflow platform",
    embedUrl: "https://player.vimeo.com/video/1153053228?h=abb31de4ed&title=0&byline=0&portrait=0",
  },
  {
    id: "2",
    company: "AdamX",
    companyUrl: "https://adamx.ai/",
    month: "Dec 2025",
    type: "Huddle",
    speaker: "Neel (CEO)",
    speakerUrl: "https://www.linkedin.com/in/neelkamal1/",
    topic: "AI analysis of buyer journey",
    embedUrl: "https://player.vimeo.com/video/1153459483?h=9201cf537b&title=0&byline=0&portrait=0",
  },
];

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Video area */}
      <div className="aspect-video bg-gray-900 relative">
        {insight.embedUrl ? (
          <iframe
            src={insight.embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={`${insight.company} — ${insight.topic}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
            <p className="text-white font-bold text-sm">Password required</p>
            <p className="text-white/60 text-xs text-center">If you have access, enter the password to watch.</p>
            <div className="w-full max-w-xs flex gap-2 mt-1">
              <input
                type="password"
                placeholder="Enter password"
                className="flex-1 rounded px-3 py-2 text-sm bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
              <button
                className="px-3 py-2 text-sm font-semibold rounded text-white"
                style={{ backgroundColor: "#1d6fcf" }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <a
              href={insight.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm underline"
              style={{ color: "#1d4ed8" }}
            >
              {insight.company}
            </a>
            <span className="text-sm text-gray-500">{insight.month}</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: TYPE_COLORS[insight.type] }}
            >
              {insight.type}
            </span>
          </div>
          <a
            href={insight.speakerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium underline"
            style={{ color: "#1d4ed8" }}
          >
            {insight.speaker}
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-1">{insight.topic}</p>
      </div>
    </div>
  );
}

export default async function InsightsPage() {
  const session = await getSession();
  if (!session) redirect("/members/login?from=/insights");
  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5" style={{ color: "#011224" }}>
            GTM / AI Discussions
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Our members and vendors regularly come together to discuss how the GTM technology landscape is changing
          </p>
          <p className="text-gray-500 mb-2">
            We have three formats, including our{" "}
            <Link href="/podcast" className="underline hover:opacity-80" style={{ color: "#c4921a" }}>podcast</Link>
            {", "}
            <span className="underline cursor-default" style={{ color: "#c4921a" }}>huddles</span>
            {" and "}
            <Link href="/briefings" className="underline hover:opacity-80" style={{ color: "#c4921a" }}>briefings</Link>
          </p>
          <p className="text-gray-500 text-sm">
            To encourage candid dialog, we only share conversations with the approval of members and companies.
          </p>
        </div>
      </section>

      {/* ── Video grid ────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INSIGHTS.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>

          {INSIGHTS.length === 0 && (
            <p className="text-center text-gray-400 py-16">No discussions posted yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
