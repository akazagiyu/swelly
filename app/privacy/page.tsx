export const dynamic = 'force-static';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Swelly Discord bot Privacy Policy. Learn how we protect your data, what information we collect, and how we use it to provide the best music bot experience.",
  openGraph: {
    title: "Swelly Privacy Policy - Data Protection & Security",
    description: "Learn about our data protection practices and privacy commitments for Swelly Discord bot users.",
    images: [
      {
        url: "/text.png",
        width: 1200,
        height: 630,
        alt: "Swelly Privacy Policy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Privacy Policy - Data Protection & Security",
    description: "Learn about our data protection practices and privacy commitments for Swelly Discord bot users.",
    images: ["/text.png"]
  }
};

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest">Privacy Policy</h1>
          <div className="text-sm text-white/60 mt-3">Effective date: <strong>September 3, 2025</strong></div>
        </header>

        <article className="card p-8 space-y-8">
          <div className="prose prose-invert max-w-none text-white/90 leading-relaxed">
            <p>
              We respect your privacy. This page explains what data we collect, how we use it, and the
              choices available to you.
            </p>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-6 mb-3">What We Collect</h2>
              <p>
                We collect information you provide directly (for example, when you subscribe to our
                newsletter or contact support) and information collected automatically (such as usage
                data and analytics). We do not sell personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Definitions</h2>
              <p>
                &quot;Personal data&quot; means any information that identifies or can be reasonably associated with an
                identifiable person. &quot;Processing&quot; means any operation performed on personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Third-Party Services</h2>
              <p>
                We may use third-party services for analytics, payments, and hosting (for example: Google
                Analytics, Stripe, Vercel). Those providers have their own privacy practices and you should
                review their policies before providing personal data to them.
              </p>
            </section>

            <section>
              <h2>How We Use Data</h2>
              <ul>
                <li>To operate and improve the service.</li>
                <li>To communicate with you about your account or transactions.</li>
                <li>To provide support and prevent abuse.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Cookies &amp; Tracking</h2>
              <p>
                We use cookies and analytics tools to understand and improve our site. You can manage
                cookie preferences in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary to provide services, comply with legal
                obligations, resolve disputes, and enforce our agreements. When data is no longer needed we will
                delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Security</h2>
              <p>
                We take reasonable measures to protect personal data from unauthorized access and disclosure,
                including access controls and encryption where appropriate. However no system is perfect; we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Children</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal data
                from children. If you are a parent and believe we have collected personal data about your child,
                contact us and we will take steps to remove it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">How to Opt-Out</h2>
              <p>
                You may opt out of marketing communications by following the unsubscribe link in emails or by
                contacting support. For other data requests, see the &quot;Your Rights&quot; section above.
              </p>
            </section>

            <section>
              <h2>Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, delete, or
                export your personal data. To exercise these rights contact us at <a href="/support">support</a>.
              </p>
            </section>

            <section>
              <h2>Changes</h2>
              <p>We may update this policy from time to time. The most recent effective date is listed above.</p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>Questions? Email <a href="mailto:support@swellybot.xyz">support@swellybot.xyz</a>.</p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
