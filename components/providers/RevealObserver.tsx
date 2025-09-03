"use client";
import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.classList.add("is-visible");
        }
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>('[data-reveal-card]').forEach((el) => {
      els.add(el);
      observer.observe(el);
    });
    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      els.clear();
    };
  }, []);
  return null;
}
