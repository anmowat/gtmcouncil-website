import Link from "next/link";
import Image from "next/image";
import { Member } from "@/components/MemberCard";
import MemberDirectory from "@/components/MemberDirectory";
import { getMembers } from "@/lib/airtable";

export const revalidate = 86400; // rebuild member list once per day

const PILLARS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Community",
    description: "Leaders helping leaders in an exclusive forum.",
    actions: [{ label: "Apply", href: "https://airtable.com/appU94hAvQcQ6XTNO/pag8kIMP7bzMXoQzG/form", gold: true }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
        <path d="m21 3 1 11h-2"/>
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
        <path d="M3 4h8"/>
      </svg>
    ),
    title: "Vendor/Member Huddles",
    description: "We invite tech CEOs to share their vision and get feedback with our members in an informal / confidential setting.",
    actions: [{ label: "View Format", href: "/huddles", gold: false }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v14"/>
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
      </svg>
    ),
    title: "Thought Leadership",
    descriptionNode: (
      <>
        We deep-dive into how the GTM landscape is changing in our{" "}
        <Link href="/podcast" className="underline hover:opacity-80" style={{ color: "#c4921a" }}>podcast series</Link>
        {" "}and{" "}
        <Link href="/briefings" className="underline hover:opacity-80" style={{ color: "#c4921a" }}>online briefings</Link>.
      </>
    ),
    actions: [
      { label: "View", href: "/insights", gold: true },
      { label: "Subscribe", href: "https://gtmcouncil.substack.com/about", gold: false },
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <rect width="20" height="14" x="2" y="6" rx="2"/>
      </svg>
    ),
    title: "Career Support",
    description: "We help each other with our careers and share high-potential rising stars to nurture the next generation of operational GTM leaders.",
    actions: [{ label: "Submit Role", href: "https://airtable.com/appU94hAvQcQ6XTNO/pagpeSRflmGRDpFBB/form", gold: true }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z"/>
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
      </svg>
    ),
    title: "Personal Brand",
    description: "We help members turn their experience into influence by introducing them to partner podcasts and featuring them on GTM Council briefings.",
    actions: [
      { label: "Share Your Podcast", href: "https://airtable.com/appU94hAvQcQ6XTNO/pagU3D904PBGB8ZqM/form", gold: true },
      { label: "View Briefings", href: "/briefings", gold: false },
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
      </svg>
    ),
    title: "Events",
    description: "We bring our membership together for intimate events and also share select sponsored events with our community.",
    actions: [{ label: "Share Event", href: "https://airtable.com/appU94hAvQcQ6XTNO/pagv90IY4XvvaNeLN/form", gold: true }],
  },
];

const SPONSORS_FEATURED = [
  { name: "Fullcast", logo: "/logo-fullcast.webp", href: "https://www.fullcast.com/", width: 280, height: 77 },
];
const SPONSORS_SECONDARY = [
  { name: "Whispered", logo: "/logo-whispered.png", href: "https://www.whispered.com/", width: 254, height: 61 },
  { name: "Upside", logo: "/logo-upside.svg", href: "https://upside.tech/", width: 171, height: 74 },
];

export default async function HomePage() {
  let members: Member[] = [];
  let membersError: string | null = null;
  try {
    members = await getMembers();
  } catch (err) {
    membersError = err instanceof Error ? err.message : String(err);
    console.error("getMembers failed:", membersError);
  }

  return (
    <div>
      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="relative pt-6 pb-4 px-4 text-center overflow-hidden">
        {/* Horizontal vignette: clear on left (logos) → white centre (text) → clear right */}
        <div
          className="absolute inset-0 pointer-events-none hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, transparent 25%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.92) 58%, transparent 75%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: "#011224" }}>
            Our Mission
          </h1>
          <p className="text-lg text-gray-600 mb-3">AI will fundamentally rewire the GTM motion.</p>
          <p className="text-lg text-gray-700 mb-3">
            The GTM Council is built to support the modern GTM Operational leader.
          </p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our community connects our members to each other and the most innovative vendors to grow our careers and lead the evolution of GTM technology.
          </p>
        </div>
      </section>

      {/* ── Community Pillars ─────────────────────────────────────── */}
      <section className="pt-4 pb-4 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4" style={{ color: "#011224" }}>
            Community Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-gray-100 rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="text-gray-500 shrink-0">{pillar.icon}</div>
                  <h3 className="text-lg font-bold" style={{ color: "#011224" }}>{pillar.title}</h3>
                </div>
                <p className="text-sm text-gray-600 flex-1">{"descriptionNode" in pillar ? pillar.descriptionNode : pillar.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {pillar.actions.map((action) =>
                    action.href.startsWith("http") ? (
                      <a
                        key={action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-semibold rounded text-white transition-colors"
                        style={{ backgroundColor: action.gold ? "#c4921a" : "#011224" }}
                      >
                        {action.label}
                      </a>
                    ) : (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="px-4 py-2 text-sm font-semibold rounded text-white transition-colors"
                        style={{ backgroundColor: action.gold ? "#c4921a" : "#011224" }}
                      >
                        {action.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Membership ────────────────────────────────────────── */}
      <section className="pt-4 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3" style={{ color: "#011224" }}>
            Our Membership
          </h2>
          <p className="text-center text-lg text-gray-600 mb-4">
            The GTM Council brings together the top GTM systems-thinkers.
          </p>
          {membersError ? (
            <p className="text-center text-red-500 py-12 text-sm font-mono">{membersError}</p>
          ) : members.length > 0 ? (
            <MemberDirectory members={members} showHeader={false} />
          ) : (
            <p className="text-center text-gray-400 py-12">
              Member directory coming soon — connect your Airtable to populate this section.
            </p>
          )}
        </div>
      </section>

      {/* ── Sponsors ──────────────────────────────────────────────── */}
      <section className="pt-3 pb-3 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-0.5" style={{ color: "#011224" }}>Our Sponsors</h2>
          <p className="text-lg text-gray-600 mb-2">Our community is proudly supported by a select group of trusted partners</p>
          <div className="flex flex-col items-center gap-0">
            <div className="flex items-center justify-center gap-16 flex-wrap">
              {SPONSORS_FEATURED.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                  <Image src={s.logo} alt={s.name} width={s.width} height={s.height} className="object-contain" style={{ marginTop: "-12px", marginBottom: "-12px" }} />
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {SPONSORS_SECONDARY.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                  <Image src={s.logo} alt={s.name} width={s.width} height={s.height} className="object-contain" style={{ marginTop: "-10px", marginBottom: "-10px" }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
