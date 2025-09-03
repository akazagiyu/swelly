"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import RevealObserver from "./RevealObserver";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
  <RevealObserver />
      <Toaster
        richColors
        position="top-right"
        toastOptions={{ className: "bg-[#0f0f0f] border border-white/10 text-white" }}
      />
    </SessionProvider>
  );
}
