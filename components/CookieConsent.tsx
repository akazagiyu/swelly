"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("cookie-consent");
      if (!v) setVisible(true);
    } catch {
      // ignore
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie-consent", "accepted"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl p-4">
        <div className="rounded-lg bg-white/10 backdrop-blur-md border border-white/15 shadow-glow p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-sm text-white/80">
            We use cookies to improve your experience. By using this site, you agree to our cookie policy.
          </p>
          <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
            <button className="btn btn-primary w-full sm:w-auto" onClick={accept}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
}
