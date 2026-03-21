import Link from "next/link";
import Image from "next/image";
import { Member } from "@/components/MemberCard";
import MemberDirectory from "@/components/MemberDirectory";
import { getMembers } from "@/lib/airtable";

export const revalidate = 86400; // rebuild member list once per day

const PILLARS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: "Community",
    description: "Leaders helping leaders in an exclusive forum.",
    actions: [{ label: "Apply", href: "https://airtable.com/appU94hAvQcQ6XTNO/pag8kIMP7bzMXoQzG/form", gold: true }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Vendor/Member Huddles",
    description: "We invite tech CEOs to share their vision and get feedback with our members in an informal / confidential setting.",
    actions: [{ label: "View Format", href: "/huddles", gold: false }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
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
      { label: "Subscribe", href: "https://gtmcouncil.substack.com/about", gold: false },
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Career Support",
    description: "We help each other with our careers and share high-potential rising stars to nurture the next generation of operational GTM leaders.",
    actions: [{ label: "Submit Role", href: "https://airtable.com/appU94hAvQcQ6XTNO/pagpeSRflmGRDpFBB/form", gold: true }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
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
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
      </svg>
    ),
    title: "Events",
    description: "We bring our membership together for intimate events and also share select sponsored events with our community.",
    actions: [{ label: "Share Event", href: "https://airtable.com/appU94hAvQcQ6XTNO/pagv90IY4XvvaNeLN/form", gold: true }],
  },
];

const SPONSORS = [
  { name: "Fullcast", logo: "/logo-fullcast.webp", href: "https://www.fullcast.com/", width: 160, height: 44 },
  { name: "Whispered", logo: "/logo-whispered.png", href: "https://www.whispered.com/", width: 180, height: 44 },
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
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: "#011224" }}>
            Community Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm"
              >
                <div className="text-gray-500">{pillar.icon}</div>
                <h3 className="text-lg font-bold" style={{ color: "#011224" }}>{pillar.title}</h3>
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3" style={{ color: "#011224" }}>
            Our Membership
          </h2>
          <p className="text-center text-gray-500 mb-10">
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
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: "#011224" }}>Our Sponsors</h2>
          <p className="text-gray-500 mb-10">Our community is proudly supported by a select group of trusted partners</p>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            {SPONSORS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <Image src={s.logo} alt={s.name} width={s.width} height={s.height} className="object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
