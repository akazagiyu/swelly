export const metadata = { title: "Ticket Status" };

import TicketLookup from "@/components/TicketLookup";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { FaSearch, FaTicketAlt } from "react-icons/fa";

export default function TicketStatusPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <FaSearch className="w-4 h-4" />
                Ticket Lookup
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Check Your 
                <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent"> Ticket Status</span>
              </h1>
              <p className="text-xl text-white/70">
                Enter your ticket ID to view the current status and any updates from our support team.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TicketLookup />
          </ScrollReveal>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white/5">
        <div className="container">
          <ScrollReveal delay={0.3}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Need More Help?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/20 text-primary mb-4">
                    <FaTicketAlt className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Submit New Ticket</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Have a new issue? Create a new support ticket and we&apos;ll help you out.
                  </p>
                  <a href="/support" className="btn btn-primary">
                    Create Ticket
                  </a>
                </div>
                <div className="card p-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-[#5865F2]/20 text-[#5865F2] mb-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.246.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.201 0 2.176 1.068 2.157 2.38 0 1.311-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.2 0 2.176 1.068 2.157 2.38 0 1.311-.956 2.38-2.157 2.38z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Join Discord</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Get instant help from our community and support team on Discord.
                  </p>
                  <a 
                    href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#"} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-outline"
                  >
                    Join Server
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}