import { getFAQ } from "@/lib/faq";
import ScrollReveal from "@/components/motion/ScrollReveal";

export const metadata = { title: "FAQ" };

export default function FAQPage() {
  const items = getFAQ();
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h1 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h1>
          <p className="text-white/70 text-center mb-6">Answers to common questions about inviting, features, premium, and privacy.</p>
        </ScrollReveal>

        <div className="mb-6">
          {/* Simple clientless filter via anchor list: keep SSR friendly */}
          <div className="grid gap-3">
            {items.map((it, i) => (
              <ScrollReveal key={i} delay={i * 0.02}>
                <details className="card" open={i === 0}>
                  <summary className="cursor-pointer font-semibold">{it.q}</summary>
                  <div className="text-white/70 text-sm mt-2 leading-relaxed">{it.a}</div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || '#'} target="_blank" rel="noreferrer" className="btn btn-outline">Still need help? Join Support</a>
        </div>
      </div>
    </div>
  );
}
