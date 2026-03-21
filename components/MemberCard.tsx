import Image from "next/image";

export interface Member {
  id: string;
  name: string;
  firstName: string;
  type: "MEM-Founding" | "MEM-OG" | "MEM-Regular" | string;
  title: string;
  linkedin: string;
  region: string;
  photoUrl?: string;
}

const BADGE: Record<string, { label: string; color: string }> = {
  "MEM-Founding": { label: "Founder", color: "#166534" },
  "MEM-OG":       { label: "OG",      color: "#15803d" },
  "MEM-Regular":  { label: "GG",      color: "#16a34a" },
};

export default function MemberCard({ member }: { member: Member }) {
  const badge = BADGE[member.type];
  const initials = member.firstName?.[0] ?? member.name?.[0] ?? "?";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="relative aspect-square bg-gray-100">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
            {initials}
          </div>
        )}

        {/* Badge (top-right) */}
        {badge && (
          <span
            className="absolute top-2 right-2 text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: badge.color }}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{member.firstName || member.name}</p>
            <p className="text-xs text-gray-500 leading-snug mt-0.5 line-clamp-2">{member.title}</p>
          </div>
          {member.linkedin && (
            <a
              href={member.linkedin.startsWith("http") ? member.linkedin : `https://${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-gray-400 hover:text-blue-600 transition-colors mt-0.5"
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
