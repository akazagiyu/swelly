"use client";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

interface NewsletterFormProps {
  isMobile?: boolean;
}

export default function NewsletterForm({ isMobile = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showError, setShowError] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setStatus("sending");

    try {
      // Simulate API call with 800ms delay for realistic feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      setStatus("sent");
      setEmail("");

      // Auto-reset after 4 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/20 border border-green-500/40 animate-in fade-in">
        <FiCheck className="text-green-400 flex-shrink-0" />
        <p className="text-sm text-green-300 font-medium">
          Thanks! Check your inbox for updates.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={submit} className={isMobile ? "flex flex-col sm:flex-row gap-2" : "flex gap-2"}>
        <div className="flex-1">
          <label className="sr-only" htmlFor={isMobile ? "footer-email" : "footer-email-desktop"}>
            Email
          </label>
          <input
            id={isMobile ? "footer-email" : "footer-email-desktop"}
            type="email"
            className={`w-full bg-white/5 border border-white/6 placeholder:text-white/40 rounded-md px-3 py-${isMobile ? "3" : "2"} text-sm text-white transition-all duration-200 focus:outline-none focus:border-white/20 focus:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setShowError(false);
            }}
            disabled={status === "sending"}
            aria-label="Email address"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`btn btn-primary ${isMobile ? "w-full sm:w-auto px-6 py-3" : "px-4"} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
        >
          {status === "sending" ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {!isMobile && "Subscribing..."}
            </span>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {showError && (
        <p className="text-xs text-red-400 mt-2">Please enter a valid email address</p>
      )}
    </div>
  );
}
