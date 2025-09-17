export const dynamic = 'force-static';

export const metadata = {
  title: "Terms of Service",
};


export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest">Terms of Service</h1>
          <div className="text-sm text-white/60 mt-3">Effective date: <strong>September 3, 2025</strong></div>
        </header>

        <article className="card p-8 space-y-8">
          <div className="prose prose-invert max-w-none text-white/90 leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-6 mb-3">Acceptance of Terms</h2>
              <p>By using our site, you agree to these Terms of Service. Please read them carefully.</p>
            </section>

            <section>
              <h2>Using the Service</h2>
              <p>Use the service only as permitted by law and these terms. Misuse may result in account
              suspension.</p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Payments and Billing</h2>
              <p>
                For paid features, you agree to provide valid payment information. Payments are processed by
                our payment provider (for example, Stripe). We may update pricing and will give notice of
                material changes.
              </p>
            </section>

            <section>
              <h2>Account Responsibility</h2>
              <p>Keep your account credentials secure. We are not responsible for unauthorized access
              caused by credential leaks.</p>
            </section>

            <section>
              <h2>Changes to Terms</h2>
              <p>We may update these terms; the updated version will be posted here with a new effective date.</p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Termination</h2>
              <p>
                We may suspend or terminate accounts that violate these terms or engage in abusive behavior.
                On termination, access to paid features will cease and any outstanding fees remain due.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, we are not liable for indirect, incidental, or
                consequential damages arising out of your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-8 mb-3">Dispute Resolution</h2>
              <p>
                Any disputes will be resolved under the laws of the jurisdiction in which we operate. You
                agree to first attempt to resolve disputes informally by contacting support.
              </p>
            </section>

            <section>
              <h2>Governing Law</h2>
              <p>These terms are governed by the laws of the jurisdiction where we operate.</p>
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
