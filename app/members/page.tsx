import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getMembers } from "@/lib/airtable";
import MemberCard, { Member } from "@/components/MemberCard";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Member Portal | GTM Council",
};

export default async function MembersPage() {
  const session = await getSession();
  if (!session) redirect("/members/login");

  let members: Member[] = [];
  try {
    members = await getMembers();
  } catch {
    // handle missing Airtable config gracefully
  }

  return (
    <div>
      {/* ── Portal header ──────────────────────────────────────── */}
      <section
        className="py-14 px-4 text-white"
        style={{ backgroundColor: "#011224" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm mb-1">Logged in as {session.email}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Member Portal</h1>
            <p className="text-white/70 mt-2">Welcome back to the GTM Council community.</p>
          </div>
          <LogoutButton />
        </div>
      </section>

      {/* ── Full member directory ─────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-extrabold" style={{ color: "#011224" }}>
                Member Directory
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {members.length} members — updated daily from Airtable
              </p>
            </div>
          </div>

          {members.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {members.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p>Member directory is loading — make sure your Airtable env vars are configured.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
