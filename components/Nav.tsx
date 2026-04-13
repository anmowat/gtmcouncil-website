"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://www.gtmcouncil.com" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Image src="/logo-gtmcouncil.png" alt="GTM Council" width={90} height={90} priority />
          </a>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <a
              href="https://gtmcouncil.substack.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: "#011224" }}
            >
              Subscribe
            </a>
            <a
              href="https://airtable.com/appU94hAvQcQ6XTNO/pag8kIMP7bzMXoQzG/form"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: "#011224", color: "#011224" }}
            >
              Apply
            </a>
            <a
              href="https://docs.google.com/document/d/1lkZ4DKQ6LptbRYbLFnQMH6wJYGDS4kK-9pFjKbNX5Ds/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: "#c4921a" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="15.5" r="5.5"/>
                <path d="M21 2l-9.6 9.6"/>
                <path d="M15.5 7.5l3 3L22 7l-3-3"/>
              </svg>
              Members
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
