import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaGithub, FaHeart } from "react-icons/fa";
import MobileCtaRestore from './MobileCtaRestore';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
  <footer aria-label="Site footer" className="mt-20 border-t border-white/6 bg-gradient-to-t from-black/40 via-white/3 to-black/10 backdrop-blur-sm text-white/90 relative overflow-hidden">
      {/* decorative gradient line */}
      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image src="/mascot.png" alt="Swelly mascot" width={44} height={44} className="rounded-md" />
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Swelly</div>
                <div className="text-xs text-white/60">© {year} Swelly</div>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-md">High-quality Discord music with powerful filters and low-latency playback. Built for communities who care about sound.</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="/invite" className="btn btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center py-3">
                <FaDiscord className="h-4 w-4" /> Invite
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="btn btn-outline inline-flex items-center gap-2 w-full sm:w-auto justify-center py-3">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <details className="md:hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer py-2">
                <span className="text-sm font-semibold text-white/90">Explore</span>
                <span className="text-white/60">▾</span>
              </summary>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                <li><Link href="/commands" className="hover:text-white">Commands</Link></li>
                <li><Link href="/premium" className="hover:text-white">Premium</Link></li>
                <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </details>

            <div className="hidden md:block">
              <h4 className="text-sm font-semibold text-white/90 mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/commands" className="hover:text-white">Commands</Link></li>
                <li><Link href="/premium" className="hover:text-white">Premium</Link></li>
                <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <details className="md:hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer py-2">
                <span className="text-sm font-semibold text-white/90">Legal</span>
                <span className="text-white/60">▾</span>
              </summary>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </details>

            <div className="hidden md:block">
              <h4 className="text-sm font-semibold text-white/90 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <details className="md:hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer py-2">
                <span className="text-sm font-semibold text-white/90">Stay in the loop</span>
                <span className="text-white/60">▾</span>
              </summary>
              <div className="mt-3">
                <p className="text-sm text-white/70 mb-3">Get product updates, release notes and occasional promotions.</p>
                <form action="/api/subscribe" method="post" className="flex flex-col sm:flex-row gap-2">
                  <label className="sr-only" htmlFor="footer-email">Email</label>
                  <input id="footer-email" name="email" type="email" required placeholder="you@example.com" className="w-full bg-white/5 border border-white/6 placeholder:text-white/40 rounded-md px-3 py-3 text-sm text-white" />
                  <button type="submit" className="btn btn-primary w-full sm:w-auto px-6 py-3">Subscribe</button>
                </form>
                <div className="text-xs text-white/50 mt-3">No spam. Unsubscribe anytime.</div>
              </div>
            </details>

            <div className="hidden md:block">
              <h4 className="text-sm font-semibold text-white/90 mb-3">Stay in the loop</h4>
              <p className="text-sm text-white/70 mb-3">Get product updates, release notes and occasional promotions.</p>
              <form action="/api/subscribe" method="post" className="flex gap-2">
                <label className="sr-only" htmlFor="footer-email-desktop">Email</label>
                <input id="footer-email-desktop" name="email" type="email" required placeholder="you@example.com" className="flex-1 bg-white/5 border border-white/6 placeholder:text-white/40 rounded-md px-3 py-2 text-sm text-white" />
                <button type="submit" className="btn btn-primary px-4">Subscribe</button>
              </form>
              <div className="text-xs text-white/50 mt-3">No spam. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/60">Made with <FaHeart className="inline text-rose-400 mx-1" /> for music lovers</div>
          <div className="text-sm text-white/60 flex items-center gap-3">
            <span>Built by Swelly • <span className="ml-2 font-medium">© {year}</span></span>
            <div className="sm:hidden">
              {/* client-side restore button */}
              {/* importing dynamically to keep Footer server component safe */}
              <MobileCtaRestore />
            </div>
          </div>
        </div>
      </div>

      {/* subtle bottom glow */}
      <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </footer>
  );
}
