import Link from "next/link";

export const metadata = {
  title: "GTM / AI Discussions | GTM Council",
  description: "Our members and vendors regularly come together to discuss how the GTM technology landscape is changing.",
};

type SessionType = "Huddle" | "Podcast";

interface Insight {
  id: string;
  company: string;
  month: string;
  type: SessionType;
  speaker: string;
  topic: string;
  embedUrl?: string; // iframe src — leave undefined for password-protected placeholder
}

const TYPE_COLORS: Record<SessionType, string> = {
  Huddle: "#15803d",
  Podcast: "#1d4ed8",
};

// Current content — update embedUrl when you have the actual embed codes
const INSIGHTS: Insight[] = [
  {
    id: "1",
    company: "Hyperbound",
    month: "Mar 2026",
    type: "Huddle",
    speaker: "Sriharsha (Sal) Guduguntla (CEO)",
    topic: "AI Roleplays",
    embedUrl: undefined,
  },
  {
    id: "2",
    company: "Clay",
    month: "Mar 2026",
    type: "Podcast",
    speaker: "Everett (Head of GTM Engineering)",
    topic: "GTM Engineering",
    embedUrl: undefined,
  },
  {
    id: "3",
    company: "11x",
    month: "Feb 2026",
    type: "Podcast",
    speaker: "Prabhav (CEO)",
    topic: "Agentic SDR",
    embedUrl: undefined,
  },
  {
    id: "4",
    company: "Rox",
    month: "Feb 2026",
    type: "Huddle",
    speaker: "Adam (VP Revenue)",
    topic: "Revenue Agents",
    embedUrl: undefined,
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
            <span className="font-bold text-sm" style={{ color: "#011224" }}>{insight.company}</span>
            <span className="text-sm text-gray-500">{insight.month}</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: TYPE_COLORS[insight.type] }}
            >
              {insight.type}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium">{insight.speaker}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{insight.topic}</p>
      </div>
    </div>
  );
}

export default function InsightsPage() {
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
