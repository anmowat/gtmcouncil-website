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


const INSIGHTS: Insight[] = [
  {
    id: "14",
    company: "Dust",
    companyUrl: "https://dust.tt/",
    month: "August 2026",
    type: "Huddle",
    speaker: "Nico (co-founder)",
    speakerUrl: "https://www.linkedin.com/in/nicolaschinot/",
    topic: "Multi-player AI harness",
    embedUrl: "https://player.vimeo.com/video/1218383829?h=80cf7235be&title=0&byline=0&portrait=0",
  },
  {
    id: "13",
    company: "Von",
    companyUrl: "https://vonlabs.ai/",
    month: "July 2026",
    type: "Huddle",
    speaker: "Sahil Aggarwal (CEO)",
    speakerUrl: "https://www.linkedin.com/in/saggarwal2/",
    topic: "Semantic Layer + Agents",
    embedUrl: "https://player.vimeo.com/video/1213474805?h=217bad5d35&title=0&byline=0&portrait=0",
  },
  {
    id: "12",
    company: "Airspeed",
    companyUrl: "https://www.goairspeed.com/",
    month: "July 2026",
    type: "Huddle",
    speaker: "Adam Liska (CEO)",
    speakerUrl: "https://www.linkedin.com/in/adliska/",
    topic: "Commercial brain for revenue teams",
    embedUrl: "https://player.vimeo.com/video/1208967775?h=3dafb99131&title=0&byline=0&portrait=0",
  },
  {
    id: "11",
    company: "Sweep",
    companyUrl: "https://www.sweep.io/",
    month: "June 2026",
    type: "Huddle",
    speaker: "Ido (CEO)",
    speakerUrl: "https://www.linkedin.com/in/idogaver/",
    topic: "Agentic layer for enterprise systems",
    embedUrl: "https://player.vimeo.com/video/1203643149?h=073895df84&title=0&byline=0&portrait=0",
  },
  {
    id: "10",
    company: "Upside",
    companyUrl: "https://www.upside.tech/",
    month: "June 2026",
    type: "Huddle",
    speaker: "Alex (CEO)",
    speakerUrl: "https://www.linkedin.com/in/alexdbauer/",
    topic: "Data layer for GTM engineers",
    embedUrl: "https://player.vimeo.com/video/1200942538?h=83a759562a&title=0&byline=0&portrait=0",
  },
  {
    id: "9",
    company: "Nue",
    companyUrl: "https://www.nue.io/",
    month: "June 2026",
    type: "Huddle",
    speaker: "Mark Walker (CEO)",
    speakerUrl: "https://www.linkedin.com/in/markwalker/",
    topic: "Top AI CPQ",
    embedUrl: "https://player.vimeo.com/video/1199563719?h=b8ff995479&title=0&byline=0&portrait=0",
  },
  {
    id: "8",
    company: "Relevance AI",
    companyUrl: "https://relevanceai.com/",
    month: "May 2026",
    type: "Huddle",
    speaker: "Daniel Vassilev (CEO)",
    speakerUrl: "https://www.linkedin.com/in/daniel-vassilev/",
    topic: "Enterprise autonomous agents",
    embedUrl: "https://player.vimeo.com/video/1190659184?h=dfd40a7a24&title=0&byline=0&portrait=0",
  },
  {
    id: "7",
    company: "GTM Council",
    companyUrl: "https://www.gtmcouncil.com/",
    month: "Apr 2026",
    type: "Huddle",
    speaker: "",
    speakerUrl: "",
    topic: "AI GTM Transformation (internal)",
    embedUrl: "https://player.vimeo.com/video/1187133640?h=e227329851&title=0&byline=0&portrait=0",
  },
  {
    id: "6",
    company: "Hyperbound",
    companyUrl: "https://www.hyperbound.ai/",
    month: "Mar 2026",
    type: "Huddle",
    speaker: "Sriharsha (Sai) Guduguntla (CEO)",
    speakerUrl: "https://www.linkedin.com/in/sguduguntla/",
    topic: "AI Roleplays",
    embedUrl: "https://player.vimeo.com/video/1173456541?h=818730c556&title=0&byline=0&portrait=0",
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
    embedUrl: "https://player.vimeo.com/video/1169211770?h=0d973691a5&title=0&byline=0&portrait=0",
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
          </div>
          {insight.speaker && (
            <a
              href={insight.speakerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium underline"
              style={{ color: "#1d4ed8" }}
            >
              {insight.speaker}
            </a>
          )}
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
            GTM Council Huddles
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            See recordings of member huddles.
          </p>
          <p className="text-gray-500 text-sm font-semibold">
            Remember, all huddles are confidential. Do not share these recordings outside GTM Council.
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
