"use client";

import { useState, useMemo } from "react";
import MemberCard, { Member } from "./MemberCard";

function sortMembers(members: Member[]): Member[] {
  return [...members].sort((a, b) => {
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();

    // Andy Mowat always first, Noah Marks always second
    if (aLower === "andy mowat") return -1;
    if (bLower === "andy mowat") return 1;
    if (aLower === "noah marks") return -1;
    if (bLower === "noah marks") return 1;

    // OG before regular
    const aOG = a.type === "MEM-OG";
    const bOG = b.type === "MEM-OG";
    if (aOG && !bOG) return -1;
    if (!aOG && bOG) return 1;

    // Alphabetical by first name
    return a.firstName.localeCompare(b.firstName);
  });
}

export default function MemberDirectory({ members }: { members: Member[] }) {
  const [regionFilter, setRegionFilter] = useState("All");

  const regions = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => { if (m.region) set.add(m.region); });
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  const sorted = useMemo(() => sortMembers(members), [members]);

  const filtered = useMemo(
    () => regionFilter === "All" ? sorted : sorted.filter((m) => m.region === regionFilter),
    [sorted, regionFilter],
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: "#011224" }}>
            Member Directory
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""} — updated daily from Airtable
          </p>
        </div>

        {/* Region filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-500">Region:</span>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className="px-3 py-1.5 text-sm font-semibold rounded transition-colors border"
              style={
                regionFilter === r
                  ? { backgroundColor: "#011224", color: "#fff", borderColor: "#011224" }
                  : { backgroundColor: "#fff", color: "#374151", borderColor: "#d1d5db" }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p>No members in this region.</p>
        </div>
      )}
    </div>
  );
}
