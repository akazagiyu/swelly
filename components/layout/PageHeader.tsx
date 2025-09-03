import { ReactNode } from "react";

export default function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      <div className="relative">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {title}
              </h1>
              {subtitle && <p className="text-white/70 mt-2 max-w-2xl">{subtitle}</p>}
            </div>
            {right && <div className="shrink-0">{right}</div>}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-24 bg-gradient-to-b from-transparent to-black/20" />
    </section>
  );
}
