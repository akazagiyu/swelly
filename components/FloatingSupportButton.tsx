"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLifeRing, FaTimes, FaTicketAlt, FaDiscord, FaQuestionCircle } from "react-icons/fa";

export default function FloatingSupportButton() {
  const [isOpen, setIsOpen] = useState(false);

  const supportOptions = [
    {
      title: "Create Ticket",
      description: "Get personalized help",
      href: "/support",
      icon: <FaTicketAlt className="w-4 h-4" />,
      color: "bg-primary hover:bg-primary/90 text-white"
    },
    {
      title: "Join Discord",
      description: "Community support",
      href: process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#",
      icon: <FaDiscord className="w-4 h-4" />,
      color: "bg-[#5865F2] hover:bg-[#5865F2]/90 text-white",
      external: true
    },
    {
      title: "Check Status",
      description: "Look up tickets",
      href: "/ticket-status",
      icon: <FaQuestionCircle className="w-4 h-4" />,
      color: "bg-white/10 hover:bg-white/20 text-white border border-white/20"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Support Options Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 mb-2">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h3 className="text-white font-semibold text-sm">How can we help?</h3>
                <p className="text-white/60 text-xs">Choose the best way to get support</p>
              </div>
              
              {supportOptions.map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noreferrer" : undefined}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${option.color}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{option.title}</div>
                    <div className="text-xs opacity-80">{option.description}</div>
                  </div>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs text-white/50 text-center">
                  Average response time: &lt; 2hrs
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-14 h-14 rounded-full transition-all duration-300 shadow-lg ${
          isOpen 
            ? "bg-red-500 hover:bg-red-600 rotate-180" 
            : "bg-primary hover:bg-primary/90 hover:scale-110"
        } shadow-primary/25`}
        aria-label={isOpen ? "Close support menu" : "Open support menu"}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent-violet opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center text-white">
          {isOpen ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <FaLifeRing className="w-5 h-5" />
          )}
        </div>

        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}

        {/* Tooltip when closed */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              Need help? Click for support options
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}