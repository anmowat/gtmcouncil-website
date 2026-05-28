import Link from "next/link";

export const metadata = {
  title: "Stacked GTM Podcast | GTM Council",
  description: "A podcast for senior GTM leaders to get smart on how GTM tech is changing.",
};

const FORMAT_FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Look at topic from all angles",
    description: "Each series will include 7-10 episodes featuring both practitioners and vendors.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Hard Hitting Questions",
    description: "Hosted by Noah Marks and Andy Mowat, who have run RevOps at 8 unicorns between them. Expect pointed questions and come ready to debate the future of GTM tech!",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "eBook",
    description: "At the end of each series, we will produce an eBook written for a C-Level Audience (help your CEO get smart on the latest innovation in GTM tech)",
  },
];

const SERIES = [
  {
    title: "GTM Engineering",
    description: "Companies are building teams dedicated to leveraging AI across their GTM motion. How can they set themselves up for success.",
    status: "inprogress" as const,
    briefUrl: "https://www.gtmcouncil.com",
  },
  {
    title: "Agentic Sales",
    description: "Personalized nurture and sequences is here. Innovative companies are increasingly automating inbound and outbound SDR. Learn from the best.",
    status: "inprogress" as const,
    briefUrl: "https://www.gtmcouncil.com",
  },
  {
    title: "GTM Agentic Data Foundation",
    description: "Agents change analytics. No more creating dashboards. Instead we will soon have agents monitoring us and coaching each GTM leader.",
    status: "soon" as const,
  },
  {
    title: "AI Manager",
    description: "LMS is dying (about time) and the most innovative companies are blowing up enablement to allow their reps to learn by practicing. Learn what is working.",
    status: "soon" as const,
  },
  {
    title: "CRM 2.0",
    description: "Your data warehouse will be your next CRM. There is a new wave of companies rebuilding CRM on top of AI and Data. Learn about the innovation that is coming.",
    status: "future" as const,
  },
  {
    title: "Consumption Pricing",
    description: "AI is changing how companies charge. And when they do your sales and finance team need to have the systems to forecast, close and bill in this new era.",
    status: "future" as const,
  },
  {
    title: "Marketing Automation 2.0",
    description: "We all hate Marketo. And we have 5+ systems sending email. Learn about the innovation some amazing vendors are bringing.",
    status: "future" as const,
  },
];

export default function PodcastPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="relative inline-block mb-2">
            <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#011224" }}>
              Stacked GTM
            </h1>
            <span
              className="absolute -top-4 -right-16 text-xs font-bold px-2 py-0.5 rounded rotate-12 text-white"
              style={{ backgroundColor: "#c4921a" }}
            >
              Coming Soon
            </span>
          </div>
          <p className="text-lg text-gray-600 mt-4">A podcast for senior GTM leaders</p>
          <p className="text-lg text-gray-600">To get smart on how GTM tech is changing</p>
        </div>
      </section>

      {/* ── Dark banner ───────────────────────────────────────────── */}
      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto rounded-xl p-8 text-center" style={{ backgroundColor: "#011224" }}>
          <p className="text-white text-xl font-bold mb-2">The GTM tech stack is tired….</p>
          <p className="text-white text-xl font-bold">….and ready for the next wave of innovation</p>
        </div>
      </section>

      {/* ── Unique Format ─────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3" style={{ color: "#c4921a" }}>
            A Unique Series Format
          </h2>
          <p className="text-center text-gray-500 mb-10">We don&apos;t casually chat about the topics, we go deep</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMAT_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 flex flex-col gap-3"
                style={{ backgroundColor: "#011224" }}
              >
                <div className="text-white/70">{f.icon}</div>
                <h3 className="font-bold text-white">{f.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Series Briefs ─────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3" style={{ color: "#c4921a" }}>
            Series Briefs
          </h2>
          <p className="text-center text-gray-500 mb-10">
            If you are an expert, we&apos;d love to explore having you on an episode
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERIES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                  {s.status === "inprogress" ? (
                    <span
                      className="shrink-0 text-xs font-bold px-3 py-1 rounded text-white"
                      style={{ backgroundColor: "#16a34a" }}
                    >
                      In Progress
                    </span>
                  ) : s.status === "soon" ? (
                    <span
                      className="shrink-0 text-xs font-bold px-3 py-1 rounded text-white"
                      style={{ backgroundColor: "#ea580c" }}
                    >
                      Coming Soon
                    </span>
                  ) : (
                    <span
                      className="shrink-0 text-xs font-bold px-3 py-1 rounded text-white"
                      style={{ backgroundColor: "#011224" }}
                    >
                      Future
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="https://www.gtmcouncil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-sm font-semibold rounded text-white transition-colors"
              style={{ backgroundColor: "#c4921a" }}
            >
              Suggest a Series
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
