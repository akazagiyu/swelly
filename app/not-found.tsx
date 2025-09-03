import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-16 text-center">
      <div className="mx-auto mb-8">
        <Image src="/notfound.png" alt="Not found" width={320} height={320} className="mx-auto w-[200px] md:w-[280px] h-auto drop-shadow-[0_0_24px_rgba(239,68,68,0.35)]" />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Page not found</h1>
      <p className="text-white/70">The page you’re looking for doesn’t exist or was moved.</p>
      <div className="mt-6">
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}
