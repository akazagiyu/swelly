import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaGithub, FaHeart } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0e0e10] text-white/80 relative overflow-hidden">
      {/* subtle top accent */}
      <div className="absolute inset-x-0 -top-px h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container py-10 grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
        <div className="flex items-center gap-3 min-w-0">
          <Image src="/mascot.png" alt="Swelly mascot" width={36} height={36} className="rounded-md" />
          <div className="min-w-0">
            <div className="font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Swelly</div>
            <p className="text-xs text-white/60 truncate">© {year} Swelly • High‑quality Discord music</p>
          </div>
        </div>

        <div className="flex md:justify-end gap-3">
          <a
            href="/invite"
            className="btn btn-primary !py-2 !px-3 inline-flex items-center gap-2"
            aria-label="Invite Swelly to your server"
          >
            <FaDiscord className="h-4 w-4" /> Invite
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline !py-2 !px-3 inline-flex items-center gap-2"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" /> GitHub
          </a>
        </div>

        <nav className="md:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
          <Link href="/commands" className="hover:text-white">Commands</Link>
          <Link href="/premium" className="hover:text-white">Premium</Link>
          <Link href="/support" className="hover:text-white">Support</Link>
          <Link href="/status" className="hover:text-white">Status</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/refund" className="hover:text-white">Refund</Link>
          <span className="ml-auto text-xs text-white/50 flex items-center gap-1">
            Made with <FaHeart className="text-rose-400" /> for music lovers
          </span>
        </nav>
      </div>
    </footer>
  );
}
