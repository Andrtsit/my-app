export type Localized = { el: string; en: string };

export function localize(value: unknown, locale: string): string {
  const v = (value ?? {}) as Partial<Localized>;
  return v[locale as keyof Localized] ?? v.en ?? "";
}
