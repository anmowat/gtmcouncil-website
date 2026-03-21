import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#011224" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="https://www.gtmcouncil.com" target="_blank" rel="noopener noreferrer">
            <Image src="/logo-gtmcouncil.png" alt="GTM Council" width={70} height={70} className="brightness-0 invert" />
          </a>

          <p className="text-white/60 text-sm">© 2026 GTM Council. All rights reserved.</p>

          {/* Footer nav */}
          <div className="flex items-center gap-6 text-sm text-white/70">
            <Link href="/briefings" className="hover:text-white transition-colors">Briefings</Link>
            <Link href="/huddles" className="hover:text-white transition-colors">Huddles</Link>
            <Link href="/podcast" className="hover:text-white transition-colors">Podcast</Link>
            <Link href="/members" className="hover:text-white transition-colors">Members</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
