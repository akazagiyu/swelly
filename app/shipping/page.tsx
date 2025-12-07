export const dynamic = 'force-static';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Swelly shipping policy for digital products. As a digital service provider, we deliver instant access to premium Discord bot features with no physical shipping required.",
  openGraph: {
    title: "Swelly Shipping Policy - Digital Product Delivery",
    description: "Learn about our digital product delivery process for Swelly premium subscriptions.",
    images: [
      {
        url: "/text.png",
        width: 1200,
        height: 630,
        alt: "Swelly Shipping Policy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Shipping Policy - Digital Product Delivery",
    description: "Learn about our digital product delivery process for Swelly premium subscriptions.",
    images: ["/text.png"]
  }
};

export default function ShippingPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest">Shipping Policy</h1>
          <div className="text-sm text-white/60 mt-3">Effective date: <strong>December 7, 2025</strong></div>
        </header>

        <article className="card p-8 space-y-8">
          <div className="prose prose-invert max-w-none text-white/90 leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-6 mb-3">Digital Product Delivery</h2>
              <p>
                Swelly is a digital service that provides a Discord music bot and premium features. 
                As we offer exclusively digital products and services, there is no physical shipping involved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Instant Access</h2>
              <p>
                Upon successful payment for premium features, your account is automatically upgraded 
                and you gain immediate access to all premium functionalities. There are no delivery 
                delays or shipping times.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Premium features are activated instantly after payment confirmation</li>
                <li>No physical products are shipped</li>
                <li>No shipping addresses are required or collected</li>
                <li>Access is granted directly through your Discord account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Service Activation</h2>
              <p>
                Once your payment is processed through our secure payment gateway (Razorpay), 
                your premium subscription becomes active immediately. You can start using premium 
                features right away without any waiting period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Access Issues</h2>
              <p>
                If you experience any issues accessing your premium features after purchase, please:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Verify that payment was successfully processed</li>
                <li>Check that you are logged in with the correct Discord account</li>
                <li>Contact our support team if problems persist</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Contact Information</h2>
              <p>
                For any questions about service delivery or access to premium features, please visit our{" "}
                <a href="/support" className="text-primary hover:underline">Support Page</a> or join our{" "}
                <a href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#"} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Discord Server
                </a>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
