import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const supported = ['en', 'en-GB', 'de', 'ru'] as const;
  const lc = supported.includes(locale as any) ? locale : 'en';

  // Map en-GB to en for fallback if file absent
  const file = lc === 'en-GB' ? 'en-GB' : lc;
  const messages = (await import(`../messages/${file}.json`)).default;

  return {
    locale: lc,
    messages
  };
});
