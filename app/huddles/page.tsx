import Link from "next/link";

export const metadata = {
  title: "Huddles | GTM Council",
  description: "Vendor/Member Huddles and Tech Huddles — informal, confidential sessions where tech CEOs share their vision and get direct feedback from senior GTM leaders.",
};

export default function HuddlesPage() {
  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#011224" }}>
            Huddles
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Informal, confidential sessions where tech CEOs share their vision and get direct feedback from senior GTM leaders.
          </p>
        </div>
      </section>

      {/* ── Formats ───────────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Vendor/Member Huddles */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: "#15803d" }}
              >
                Huddle
              </span>
              <h2 className="text-xl font-extrabold" style={{ color: "#011224" }}>
                Vendor / Member Huddles
              </h2>
            </div>
            <p className="text-gray-600">
              We invite tech CEOs to share their vision for the future and get critical feedback from our members in an informal, confidential setting.
            </p>
            <blockquote className="border-l-4 pl-4 italic text-gray-500 text-sm" style={{ borderColor: "#c4921a" }}>
              &ldquo;We&apos;ve been quietly running these huddles for 9 years. The unique format to bring in CEOs who know the tech and space creates such great discussion and learning with our members.&rdquo;
            </blockquote>
            <ul className="text-sm text-gray-600 space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span style={{ color: "#c4921a" }}>✓</span>
                Typically 10–20 senior RevOps leaders attend
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#c4921a" }}>✓</span>
                Informal Q&amp;A — no slides required
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#c4921a" }}>✓</span>
                Last 10 minutes: Members-only insights shared anonymously
              </li>
            </ul>
            <div className="mt-auto pt-4 flex gap-3">
              <a
                href="https://www.gtmcouncil.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-sm font-semibold rounded text-white transition-colors"
                style={{ backgroundColor: "#c4921a" }}
              >
                Request a Huddle
              </a>
              <Link
                href="/insights"
                className="px-5 py-2.5 text-sm font-semibold rounded text-white transition-colors"
                style={{ backgroundColor: "#011224" }}
              >
                Past Huddles
              </Link>
            </div>
          </div>

          {/* Tech Huddles */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: "#15803d" }}
              >
                Huddle
              </span>
              <h2 className="text-xl font-extrabold" style={{ color: "#011224" }}>
                Tech Huddles
              </h2>
            </div>
            <p className="text-gray-600">
              Get direct input from senior RevOps leaders. Share your vision for the future and receive critical, candid feedback from operators who live the problems you&apos;re solving.
            </p>
            <blockquote className="border-l-4 pl-4 italic text-gray-500 text-sm" style={{ borderColor: "#c4921a" }}>
              &ldquo;It was powerful to share how we are seeing AI change manager coaching and enablement with 20+ RevOps leaders and get input on our platform. The insights around how the group looks at buy-vs-build in this AI area accelerated our thinking.&rdquo;
            </blockquote>
            <ul className="text-sm text-gray-600 space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span style={{ color: "#c4921a" }}>✓</span>
                Candid, off-the-record dialog
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#c4921a" }}>✓</span>
                Accelerate product thinking with real operator feedback
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#c4921a" }}>✓</span>
                Build trust with a room of VP+ buyers
              </li>
            </ul>
            <div className="mt-auto pt-4">
              <a
                href="https://www.gtmcouncil.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 text-sm font-semibold rounded text-white transition-colors"
                style={{ backgroundColor: "#c4921a" }}
              >
                Request a Tech Huddle
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-gray-200 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#011224" }}>
            Want to join a huddle as a member?
          </h2>
          <p className="text-gray-500 mb-6">
            GTM Council members get invited to upcoming huddles. Apply to join the community.
          </p>
          <a
            href="https://www.gtmcouncil.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm font-semibold rounded text-white transition-colors"
            style={{ backgroundColor: "#c4921a" }}
          >
            Apply to Join
          </a>
        </div>
      </section>
    </div>
  );
}
