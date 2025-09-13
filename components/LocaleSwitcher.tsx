"use client";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export default function LocaleSwitcher({ current, compact = false }: { current: string; compact?: boolean }) {
  const t = useTranslations('switcher');
  const [isPending, startTransition] = useTransition();

  const change = (value: string) => {
    startTransition(() => {
      try {
        document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch {}
      window.location.reload();
    });
  };

  return (
    <label className={`inline-flex items-center gap-2 text-white/70 ${compact ? 'text-xs' : 'text-sm'}`}>
      <span className="sr-only md:not-sr-only">{t('label')}</span>
      <select
        className={`bg-transparent border border-white/10 rounded px-2 py-1 focus:outline-none ${compact ? 'text-xs' : 'text-sm'}`}
        value={current}
        onChange={(e) => change(e.target.value)}
        disabled={isPending}
      >
        <option value="en">{t('en')}</option>
        <option value="en-GB">{t('en-GB')}</option>
        <option value="de">{t('de')}</option>
        <option value="ru">{t('ru')}</option>
      </select>
    </label>
  );
}
