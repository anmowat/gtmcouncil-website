export const revalidate = 86400;

export const metadata = {
  title: "Online Briefings | GTM Council",
  description: "Webinar-style online briefings to share insights from GTM Council members on topics that educate and resonate with broader GTM operator community.",
};

export default function BriefingsPage() {
  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#011224" }}>
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

      {/* ── Briefing Format ───────────────────────────────────────── */}
      <section className="pt-6 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6" style={{ color: "#c4921a" }}>
            Briefing Format
          </h2>
          <div className="bg-gray-100 rounded-xl border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#c4921a" }} />
                <p className="text-gray-700">A 45-minute webinar-style discussion with 3–4 GTM Council members on a topic</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#c4921a" }} />
                <p className="text-gray-700">Designed to share insights from our members and educate the broader ecosystem about what we are learning</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
