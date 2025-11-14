"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/0 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link className="text-2xl font-bold tracking-tight text-gray-900" href="/">
          <span className="text-black/60">Kollege</span>Apply
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <Link href="/lp1" className="text-md font-bold text-gray-800 hover:text-gray-900 transition">
            LP1
          </Link>

          <Link href="/lp2" className="text-md font-bold text-gray-800 hover:text-gray-900 transition">
            LP2
          </Link>
        </nav>
      </div>
    </header>
  );
}
