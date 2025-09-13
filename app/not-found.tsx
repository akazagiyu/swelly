import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Decorative background orbs (client-only)
const ParallaxOrbs = dynamic(() => import("@/components/motion/ParallaxOrbs"), { ssr: false });

export default function NotFound() {
  return (
    <div className="relative">
      <ParallaxOrbs />
      <div className="container py-16 md:py-24 relative z-10">
        {/* Landmark for assistive tech */}
        <section role="region" aria-labelledby="nf-title" className="text-center max-w-2xl mx-auto">
          {/* big but decorative 404 */}
          <div aria-hidden className="mb-6 select-none">
            <span className="inline-block text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,255,255,0.06)]">
              404
            </span>
          </div>

          <div className="mx-auto mb-6">
            <Image
              src="/notfound.png"
              alt="Illustration of a missing page"
              width={320}
              height={320}
              className="mx-auto w-[200px] md:w-[260px] h-auto drop-shadow-[0 0 24px rgba(171, 71, 188, 0.6)]"
              priority
            />
          </div>

          <h1 id="nf-title" tabIndex={-1} className="text-3xl md:text-5xl font-extrabold mb-3">
            Page not found
          </h1>
          <p className="text-white/70 max-w-lg mx-auto">
            The page you’re looking for doesn’t exist, was moved, or might be temporarily unavailable.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn btn-primary w-full sm:w-auto">Back to home</Link>
            <Link href="/support" className="btn btn-outline w-full sm:w-auto">Contact support</Link>
          </div>

          <div className="mt-6 text-sm text-white/60">
            <p className="mb-2">You can also try these:</p>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              <li><Link href="/commands" className="underline decoration-white/20 hover:decoration-white">Commands</Link></li>
              <li aria-hidden>•</li>
              <li><Link href="/status" className="underline decoration-white/20 hover:decoration-white">Status</Link></li>
              <li aria-hidden>•</li>
              <li><Link href="/invite" className="underline decoration-white/20 hover:decoration-white">Invite the bot</Link></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
