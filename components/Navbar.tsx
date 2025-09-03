"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthButton from "./auth/AuthButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/commands", label: "Commands" },
  { href: "/premium", label: "Premium" },
  { href: "/status", label: "Status" },
  { href: "/invite", label: "Invite" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        setScrolled(y > 8);
        const doc = document.documentElement;
        const max = (doc.scrollHeight - doc.clientHeight) || 1;
        setProgress(Math.min(1, Math.max(0, y / max)));
      });
    };
  onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-black/50 transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[#0d0d10]/75"
          : "border-white/5 bg-transparent"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? "h-12 px-2" : "h-16 px-4"}`}>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/swelly1.png"
            alt="Swelly logo"
            width={scrolled ? 24 : 32}
            height={scrolled ? 24 : 32}
            className="transition-all duration-300 rounded-md shadow-glow"
            priority
          />
          <span className={`transition-all duration-300 ${scrolled ? "text-sm" : "text-lg"}`}>Swelly</span>
        </Link>
        <nav className={`hidden md:flex items-center transition-all duration-300 ${scrolled ? "gap-4 text-[13px]" : "gap-6 text-sm"}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative hover:text-white ${
                pathname === l.href ? "text-white" : "text-white/70"
              } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={`flex items-center transition-all duration-300 ${scrolled ? "gap-2" : "gap-3"}`}>
          <AuthButton />
        </div>
      </div>
      {/* Scroll progress bar */}
      <div className="relative h-[2px]">
        <div
          className="absolute left-0 top-0 h-[2px] origin-left bg-gradient-to-r from-primary to-accent-violet transition-transform"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
