export const revalidate = 86400;

export const metadata = {
  title: "Thought Leadership | GTM Council",
  description: "In-depth reports and articles from GTM Council members on AI and the future of GTM.",
};

const ARTICLES = [
  {
    title: "GTM Data Stack — Defined",
    href: "https://gtmcouncil.substack.com/p/the-gtm-data-stack-defined",
  },
  {
    title: "Bottlenecks to GTM Execution",
    href: "https://gtmcouncil.substack.com/p/the-4-bottlenecks-to-great-revops",
  },
  {
    title: "Rearchitecting GTM for the AI Era",
    href: "https://gtmcouncil.substack.com/p/rearchitecting-gtm-for-the-ai-era",
  },
  {
    title: "What Does RevOps Do?",
    href: "https://gtmcouncil.substack.com/p/what-does-revops-do",
  },
];

export default function ContentPage() {
  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-5" style={{ color: "#011224" }}>
            GTM Council Thought Leadership
          </h1>
          <p className="text-lg text-gray-600">
            Our members think deeply about how AI is impacting GTM, and we love to share insights
            from the group, our podcast, and key articles from our substack here as resources for everybody.
          </p>
        </div>
      </section>

      {/* ── Articles ──────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl p-6 border border-blue-100 hover:border-blue-400 hover:shadow-md transition-all"
                style={{ backgroundColor: "#011224" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold text-white leading-snug">
                    {article.title}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0 text-white/60 group-hover:text-white transition-colors mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
