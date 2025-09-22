export const dynamic = 'force-static';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Swelly premium refund policy and procedures. Learn about our refund terms, cancellation process, and how to request refunds for premium Discord bot subscriptions.",
  openGraph: {
    title: "Swelly Refund Policy - Premium Subscription Terms",
    description: "Review our refund policy and procedures for Swelly premium subscriptions.",
    images: [
      {
        url: "/text.png",
        width: 1200,
        height: 630,
        alt: "Swelly Refund Policy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Refund Policy - Premium Subscription Terms",
    description: "Review our refund policy and procedures for Swelly premium subscriptions.",
    images: ["/text.png"]
  }
};

export default function RefundPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest">Refund Policy</h1>
          <div className="text-sm text-white/60 mt-3">Effective date: <strong>September 3, 2025</strong></div>
        </header>

        <article className="card p-8 space-y-8">
          <div className="prose prose-invert max-w-none text-white/90 leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-6 mb-3">Overview</h2>
              <p>We want you to be satisfied with Premium purchases. Refunds are offered at our
              discretion and in line with applicable laws.</p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Eligibility</h2>
              <p>
                Refunds are typically considered for technical issues that prevent access to paid features.
                To be eligible, you must provide proof of purchase and a clear description of the problem.
              </p>
              <p className="text-sm text-white/60">Non-refundable items: voluntary donations, promotional purchases, or trial fees may not be refundable.</p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">How to Request</h2>
              <p>
                Contact <a href="mailto:support@swellybot.xyz">support@swellybot.xyz</a> with your order ID,
                purchase receipt, and a description of the issue. Include screenshots if helpful.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Processing Time &amp; Outcome</h2>
              <p>
                We typically respond within 3 business days and complete refunds within 7–14 business days if
                approved. Refunds will be issued to the original payment method when possible.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
