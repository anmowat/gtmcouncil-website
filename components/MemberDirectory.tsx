"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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

export default function MemberDirectory({ members, showHeader = true }: { members: Member[]; showHeader?: boolean }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const regions = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => { if (m.region) set.add(m.region); });
    return Array.from(set).sort();
  }, [members]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleRegion(region: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(region) ? next.delete(region) : next.add(region);
      return next;
    });
  }

  function clearAll() { setSelected(new Set()); }

  const sorted = useMemo(() => sortMembers(members), [members]);

  const filtered = useMemo(
    () => selected.size === 0 ? sorted : sorted.filter((m) => selected.has(m.region)),
    [sorted, selected],
  );

  const label = selected.size === 0
    ? "All Regions"
    : selected.size === 1
      ? Array.from(selected)[0]
      : `${selected.size} Regions`;

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`flex items-center flex-wrap gap-4 ${showHeader ? "justify-between mb-6" : "justify-center mb-3"}`}>
        {showHeader && (
          <div>
            <h2 className="text-2xl font-extrabold" style={{ color: "#011224" }}>
              Member Directory
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} member{filtered.length !== 1 ? "s" : ""} — updated daily from Airtable
            </p>
          </div>
        )}

        {/* Region multi-select dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded border transition-colors"
            style={{ borderColor: selected.size > 0 ? "#011224" : "#d1d5db", color: "#011224", backgroundColor: "#fff" }}
          >
            <span>{label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
              {regions.map((r) => (
                <label key={r} className="flex items-center gap-2.5 px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selected.has(r)}
                    onChange={() => toggleRegion(r)}
                    className="rounded"
                    style={{ accentColor: "#011224" }}
                  />
                  <span className="text-gray-700">{r}</span>
                </label>
              ))}
              {selected.size > 0 && (
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button onClick={clearAll} className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50" style={{ color: "#c4921a" }}>
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
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
