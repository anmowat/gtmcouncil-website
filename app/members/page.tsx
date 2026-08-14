import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Member Resources | GTM Council",
};

const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: "#1d4ed8" }}>
    {children}
  </a>
);

// Bolds the text before the first ": "
function bc(text: string): ReactNode {
  const idx = text.indexOf(": ");
  if (idx === -1) return text;
  return <><strong>{text.slice(0, idx)}</strong>: {text.slice(idx + 2)}</>;
}

const SECTIONS: {
  title: string;
  intro: ReactNode;
  items: { heading: ReactNode; body: ReactNode; bullets?: ReactNode[] }[];
}[] = [
  {
    title: "Community",
    intro: "GTM Council gives our members a private forum to collaborate with our peers. Here are guidelines and ways you can get engaged:",
    items: [
      {
        heading: "Slack",
        body: "We created the community to give us a safe place to share ideas and help each other.",
        bullets: [
          bc("Introduce Yourself: Add your photo and introduce yourself in #general"),
          bc("Basic Slack Etiquette: Use threads to reply to help keep conversations organized"),
          bc("Respect confidentiality: You can share concepts discussed but never share screenshots / people's names"),
          bc("Engage in the Discussion: Bring new topics / add your input to existing ones"),
        ],
      },
      {
        heading: <L href="https://www.gtmcouncil.com/huddles">Huddles</L>,
        body: "We invite vendors in to talk strategy and get feedback. At the beginning and end we have opportunities for members to chat / get to know each other / build relationships.",
      },
      {
        heading: "Events",
        body: <>We share events from vendors and also love members to organize meetups locally. If you see a good senior event, add it in #community-events. <L href="https://airtable.com/appU94hAvQcQ6XTNO/shrG1RAcQbQDNiJ4i">Find upcoming events here</L></>,
      },
    ],
  },
  {
    title: "Building Your Brand & Career",
    intro: "We love to amplify member's voices. Here are some areas you can take advantage of:",
    items: [
      {
        heading: <L href="https://www.gtmcouncil.com/briefings">Amplify Your Expertise</L>,
        body: "We love helping members share insights publicly. These are a great opportunity to increase your brand and get to know other members. DM Andy to volunteer for a briefing.",
      },
      {
        heading: "Amplify Your Voice",
        body: <>We have found podcasts are a <L href="https://www.whispered.com/post/podcast">great way to build your brand</L>. We maintain a <L href="https://airtable.com/appU94hAvQcQ6XTNO/shr1RI3yYTK2U0eej">list of RevOps podcasts</L> that we know the hosts and can often make introductions to.</>,
        bullets: [
          bc("Get intros: If you want an introduction to a host, let us know"),
          bc("Add new podcasts: If you have been on another podcast we should meet the host, DM Andy and we can add it"),
        ],
      },
      {
        heading: "Amplify Your Career",
        body: "There are several ways we can help you / each other here:",
        bullets: [
          <><strong><L href="https://airtable.com/appU94hAvQcQ6XTNO/pagpeSRflmGRDpFBB/form">Add a role</L></strong>: If you hear of a role, add it to #community-careers</>,
          bc("Share rockstars: If you know someone junior who is great and looking, share their profile in #community-careers — another member may want to hire them!"),
          <><strong>Need Career Advice</strong>: If you need to chat on careers, drop Andy a note. He is always happy to support and can give discounts to <L href="http://www.whispered.com/">Whispered</L> for GTM council members</>,
        ],
      },
      {
        heading: "Amplify Your Presence",
        body: "We created #community-social to help amplify posts you make / share interesting discussions.",
      },
    ],
  },
  {
    title: "Thought Leadership",
    intro: "We have several different formats for creating great discussions around topics. We love to have members participate in all. Reach out to Andy/Noah to provide suggestions / get involved:",
    items: [
      {
        heading: <L href="https://www.gtmcouncil.com/huddles">Huddles</L>,
        body: "Every month we will invite a C-level leader from a top vendor to meet with our group. These give us a chance to learn and share input with them. You should have these on your calendar (if not, ping Noah). If you want to suggest a vendor, reach out to Noah.",
      },
      {
        heading: <L href="https://www.gtmcouncil.com/podcast">Podcast</L>,
        body: "We deep-dive into topics with vendors, practitioners and investors. If you have deep interest in a series topic, let Noah or Andy know.",
      },
      {
        heading: <L href="https://www.gtmcouncil.com/briefings">Briefings</L>,
        body: "We bring together 2-4 members for a webinar style format. These can increase your brand and help you learn.",
      },
      {
        heading: <L href="https://gtmcouncil.substack.com/about">Our Substack</L>,
        body: "If you want to explore publishing an article together… drop us a line.",
      },
    ],
  },
  {
    title: "Admin",
    intro: "Resources for your GTM Council membership",
    items: [
      {
        heading: <L href="https://billing.stripe.com/p/login/9B614p6O8edV4ghg334sE00">Subscription Portal</L>,
        body: "Update your credit card, get a receipt.",
      },
      {
        heading: "Update your directory listing",
        body: "DM Andy.",
      },
    ],
  },
];

export default async function MembersPage() {
  const session = await getSession();
  if (!session) redirect("/members/login?from=/members");

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="py-10 px-4 text-white" style={{ backgroundColor: "#011224" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/50 text-xs mb-1">Logged in as {session.email}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Member Resources</h1>
          </div>
          <LogoutButton />
        </div>
      </section>

      {/* ── Welcome ────────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-2">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to the GTM Council. We are building this to accelerate your career and understand and shape how AI drives GTM. This page provides actionable links to the latest member resources.
          </p>
        </div>
      </section>

      {/* ── Sections ───────────────────────────────────────────── */}
      <div className="px-4 pt-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#011224" }}>
                {section.title}
              </h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">{section.intro}</p>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#c4921a" }} />
                      <h3 className="font-bold text-lg" style={{ color: "#011224" }}>{item.heading}</h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed ml-4">{item.body}</p>
                    {item.bullets && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="text-lg text-gray-500 flex items-start gap-2">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-gray-400" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ── Feedback ─────────────────────────────────────── */}
          <div className="rounded-xl p-6 text-center" style={{ backgroundColor: "#011224" }}>
            <p className="text-white font-semibold text-lg mb-1">Feedback / Suggestions?</p>
            <p className="text-white/70 text-lg">Slack Noah and Andy. We are building this for all of us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
