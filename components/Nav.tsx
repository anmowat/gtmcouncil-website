"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://www.gtmcouncil.com" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Image src="/logo-gtmcouncil.png" alt="GTM Council" width={90} height={90} priority />
          </a>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/briefings" className={`hover:text-navy transition-colors ${pathname === "/briefings" ? "text-navy font-semibold" : ""}`} style={{ color: pathname === "/briefings" ? "#011224" : undefined }}>Briefings</Link>
            <Link href="/podcast" className={`hover:text-navy transition-colors ${pathname === "/podcast" ? "font-semibold" : ""}`} style={{ color: pathname === "/podcast" ? "#011224" : undefined }}>Podcast</Link>
            <Link href="/insights" className={`hover:text-navy transition-colors ${pathname === "/insights" ? "font-semibold" : undefined}`} style={{ color: pathname === "/insights" ? "#011224" : undefined }}>Insights</Link>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.gtmcouncil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: "#011224" }}
            >
              Subscribe
            </a>
            <a
              href="https://www.gtmcouncil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: "#011224", color: "#011224" }}
            >
              Apply
            </a>
            <Link
              href="/members"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: "#c4921a" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Members
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
