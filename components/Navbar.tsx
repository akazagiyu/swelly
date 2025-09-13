"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthButton from "./auth/AuthButton";
import Sparkles from './Sparkles';
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

const baseLinks = [
  { href: "/", key: "home" },
  { href: "/commands", key: "commands" },
  { href: "/premium", key: "premium" },
  { href: "/team", key: "team" },
  { href: "/status", key: "status" },
  { href: "/invite", key: "invite" },
  { href: "/dashboard", key: "dashboard" },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
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

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
          {/* text logo on md+ screens, compact mascot on small screens */}
          <Image
            src="/text.png"
            alt="Swelly"
            width={scrolled ? 50 : 70}
            height={scrolled ? 20 : 25}
            priority
          />
          {/* <Image
            src="/swelly1.png"
            alt="Swelly logo"
            width={scrolled ? 24 : 32}
            height={scrolled ? 24 : 32}
            className="md:hidden transition-all duration-300 rounded-md shadow-glow"
            priority
          /> */}
          {/* <span className={`transition-all duration-300 ${scrolled ? "text-sm" : "text-lg"} hidden sm:inline`}>Swelly</span> */}
        </Link>
        <nav className={`hidden md:flex items-center transition-all duration-300 ${scrolled ? "gap-4 text-[13px]" : "gap-6 text-sm"}`}>
          {baseLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative hover:text-white ${
                pathname === l.href ? "text-white" : "text-white/70"
              } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full`}
            >
              {l.href === '/premium' ? (
                <span className="relative inline-flex items-center">
                  <span className="text-yellow-300 font-medium">{t(l.key)}</span>
                  <span className="absolute -top-1 -right-4 pointer-events-none">
                    {/* <Sparkles size={12} color="#F5D06E" /> */}
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">{t(l.key)}</span>
              )}
            </Link>
          ))}
          {/* Language switcher */}
          <LocaleSwitcher current={locale} />
        </nav>
        <div className={`flex items-center transition-all duration-300 ${scrolled ? "gap-2" : "gap-3"}`}>
          <div className="md:hidden">
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:bg-white/5"
            >
              <svg className={`w-5 h-5 transition-transform ${mobileOpen ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
          <div className="hidden md:block">
            <AuthButton />
          </div>
        </div>
      </div>
      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-b border-white/10 transform transition-transform ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`} role="dialog" aria-modal="true">
          <div className="container py-4 text-white">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src="/text.png" alt="Swelly" width={100} height={28} />
              </Link>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-white/70 hover:bg-white/5">
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {baseLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-md text-white/90 bg-transparent hover:bg-white/5">
                  {l.href === '/premium' ? (
                    <span className="relative inline-flex items-center">
                      <span className="text-yellow-300 font-medium">{t(l.key)}</span>
                      <span className="absolute -top-1 -right-3 pointer-events-none">
                        <Sparkles size={12} color="#F5D06E" />
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">{t(l.key)}</span>
                  )}
                </Link>
              ))}
              <div className="px-3">
                <LocaleSwitcher current={locale} compact />
              </div>
              <div className="pt-2">
                <AuthButton onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </div>
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
