import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#011224" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <div className="leading-none">
              <div className="font-extrabold text-base tracking-wide text-white">GTM</div>
              <div className="text-xs tracking-[0.2em] font-medium text-white/80">COUNCIL</div>
            </div>
          </Link>

          <p className="text-white/60 text-sm">© 2026 GTM Council. All rights reserved.</p>

          {/* Footer nav */}
          <div className="flex items-center gap-6 text-sm text-white/70">
            <Link href="/briefings" className="hover:text-white transition-colors">Briefings</Link>
            <Link href="/podcast" className="hover:text-white transition-colors">Podcast</Link>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <Link href="/members" className="hover:text-white transition-colors">Members</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
