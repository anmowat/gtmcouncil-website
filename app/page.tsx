import Link from "next/link";
import Image from "next/image";
import { Member } from "@/components/MemberCard";
import MemberDirectory from "@/components/MemberDirectory";
import { getMembers } from "@/lib/airtable";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const TESTIMONIALS = [
  {
    quote: "It's been awesome being part of this group. I've posted questions, gotten answers and had people jump on calls to pressure test ideas real-time. What I appreciate most is how everyone shows up. Zero ego, real operators, honest conversations, and a real willingness to help each other get better. With AI changing how we work so quickly, having a group like this to learn with, adapt with, and lean on is rare.",
    name: "Noelle Uglesic",
    title: "Global VP of RevOps @ Clio",
    photoUrl: "/photos/noelle-uglesic.jpg",
    linkedin: "https://www.linkedin.com/in/noelleuglesic/",
  },
  {
    quote: "GTM Council has personally been a great unlock for me and I'm super appreciative of the space. GTM Council gives me a forum to quickly vet and ideate with other operators who are in it every day. At the current pace of innovation, it's been incredibly valuable to cut through noise vs. signal and pressure test decisions with a trusted peer group",
    name: "Matt Flotard",
    title: "VP of Revenue Operations @ Gong",
    photoUrl: "/photos/matt-flotard.jpg",
    linkedin: "https://www.linkedin.com/in/matthewflotard/",
  },
  {
    quote: "There are a lot of communities out there, but GTM Council is the most intentionally curated one I've been part of. You're trading notes with senior operators who've collectively built GTM at hundreds of companies - and when it comes to AI, it's been an invaluable network to separate signal from hype and hear what's actually happening on the ground. It's also become one of my go-to networks for finding and vetting exceptional talent.",
    name: "Jessica Chiew",
    title: "Global Head of GTM Strategy and Operations",
    photoUrl: "/photos/jessica-chiew.png",
    linkedin: "https://www.linkedin.com/in/jessicachiew/",
  },
  {
    quote: "GTM is changing faster than any playbook can keep up with. What's rare about GTM Council is the quality of the people and how they show up — senior operators who are actually doing the work. Running experiments, building with AI hands-on, figuring out what's landing in real-time. More signal here than from any conference or report.",
    name: "Sid Kumar",
    title: "Head of GTM Strategy & Planning @ Databricks",
    photoUrl: "/photos/sid-kumar.jpg",
    linkedin: "https://www.linkedin.com/in/siddarthkumar/",
  },
  {
    quote: "I've leveled up here. GTM Council is the place where I can ask questions and learn from my peers in a safe, non-competitive space. I was looking for where to find people better than me I can look up to, and I found it.",
    name: "Evan Quasney",
    title: "RevOps Leader",
    photoUrl: "/photos/evan-quasney.jpg",
    linkedin: "https://www.linkedin.com/in/evan-quasney/",
  },
];

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
    description: "Our community connects our members to each other and the most innovative vendors to grow our careers and lead the evolution of GTM technology.",
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
    actions: [{ label: "View Format", href: "/huddles", gold: true }],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v14"/>
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
      </svg>
    ),
    title: "Thought Leadership",
    description: "Our \"Stacked GTM\" podcast goes deep (~7-10 episodes with top practitioners and vendors on each topic) to explore how AI is changing GTM landscape.",
    actions: [],
    iconLinks: [
      {
        href: "https://open.spotify.com/show/6CR6uDvyVyS2x3BK0vNOqd",
        ariaLabel: "Listen on Spotify",
        icon: <Image src="/logo-spotify.png" alt="Spotify" width={36} height={36} className="rounded-full" />,
      },
      {
        href: "https://podcasts.apple.com/us/podcast/stacked-gtm/id1896338897",
        ariaLabel: "Listen on Apple Podcasts",
        icon: <Image src="/logo-apple-podcasts.png" alt="Apple Podcasts" width={36} height={36} className="rounded-xl" />,
      },
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
      { label: "GTM Council Briefings", href: "/briefings", gold: true },
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
    actions: [{ label: "Share Event", href: "https://www.whisperedevents.com/", gold: true }],
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
          <p className="text-lg text-gray-700">
            We unite leading GTM operators to shape the change
          </p>
          <p className="text-lg text-gray-700">
            and turn that insight into real advantage for our members.
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
                <p className="text-sm text-gray-600 flex-1">{pillar.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 justify-center">
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
                  {"iconLinks" in pillar && pillar.iconLinks?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Member Testimonials ───────────────────────────────────── */}
      <section className="py-8 px-4 bg-white">
        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </section>

      {/* ── Our Membership ────────────────────────────────────────── */}
      <section className="pt-4 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3" style={{ color: "#011224" }}>
            Our Membership
          </h2>
          <p className="text-center text-lg text-gray-600 mb-1">
            The GTM Council brings together the top GTM systems-thinkers.
          </p>
          <p className="text-center text-lg text-gray-600 mb-4">
            Following are select members of our group.
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
