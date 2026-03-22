import { getFutureTopics, FutureTopic } from "@/lib/airtable";

export const revalidate = 86400;

export const metadata = {
  title: "Online Briefings | GTM Council",
  description: "Webinar-style online briefings to share insights from GTM Council members on topics that educate and resonate with broader GTM operator community.",
};

const AREA_COLORS: Record<string, string> = {
  Careers: "#7c3aed",
  Agentic: "#0891b2",
  Enablement: "#15803d",
  Technology: "#c2410c",
  Leadership: "#b45309",
};

function areaColor(area: string) {
  return AREA_COLORS[area] ?? "#011224";
}

export default async function BriefingsPage() {
  let topics: FutureTopic[] = [];
  try {
    topics = await getFutureTopics();
  } catch {
    // will show placeholder if Airtable not configured
  }

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#011224" }}>
            Online Briefings
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Webinar-style online briefings to share insights from GTM Council members on topics that educate and resonate with broader GTM operator community.
          </p>
        </div>
      </section>

      {/* ── Upcoming & Past Briefings (Contrast embed) ───────────── */}
      <section className="px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4" style={{ color: "#c4921a" }}>
            Upcoming (and Past) Briefings
          </h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://watch.getcontrast.io/widgets/gtmcouncil/all-events?count=10&primaryColor=%23011224&locale=en"
              style={{ width: "100%", height: "100%", minHeight: "500px" }}
              title="Contrast Upcoming Events"
              frameBorder="0"
            />
          </div>
        </div>
      </section>

      {/* ── Future Topics ─────────────────────────────────────────── */}
      <section className="pt-6 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4" style={{ color: "#c4921a" }}>
            Future Topics
          </h2>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <a
              href="https://www.gtmcouncil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-semibold rounded text-white transition-colors"
              style={{ backgroundColor: "#c4921a" }}
            >
              Suggest Topic
            </a>
            <a
              href="https://www.gtmcouncil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-semibold rounded text-white transition-colors"
              style={{ backgroundColor: "#011224" }}
            >
              Volunteer as Panelist
            </a>
          </div>
          <p className="text-center text-sm mb-4" style={{ color: "#c4921a" }}>
            We typically have 2–3 panelists for a briefing. If you&apos;d like to volunteer, DM or click the button above.
          </p>

          {/* Topic tiles */}
          {topics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAMPLE_TOPICS.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TopicCard({ topic }: { topic: FutureTopic }) {
  return (
    <div className="bg-gray-100 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-bold text-gray-600">{topic.title}</h3>
        {topic.area && (
          <span
            className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: areaColor(topic.area) }}
          >
            {topic.area}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{topic.description}</p>
    </div>
  );
}

// Shown when Airtable isn't connected yet
const SAMPLE_TOPICS: FutureTopic[] = [
  { id: "1", title: "RevOps --> Operating Partner", area: "Careers", description: "Discussion on the operating partner role, what it takes to get it and how it differs from a revops role" },
  { id: "2", title: "RevOps --> CRO", area: "Careers", description: "Hear from leaders who have grown from RevOps to take over all Revenue leadership" },
  { id: "3", title: "AI SDR", area: "Agentic", description: "Operators sharing insights on successful AI SDR programs" },
  { id: "4", title: "AI Roleplays", area: "Enablement", description: "Deep-dive into how companies are changing enablement with AI roleplays" },
];
