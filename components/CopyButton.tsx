"use client";
import { useState } from "react";

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <button type="button" onClick={onCopy} className={className ?? "btn btn-outline btn-sm"} aria-live="polite">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
