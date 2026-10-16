'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LABELS: Record<string, string> = {
  el: 'Ελληνικά',
  en: 'English',
};

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: string | null) {
    if (!nextLocale || nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Select value={locale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger size="sm" className="w-36" aria-label="Language">
        <SelectValue>{(value: string) => LABELS[value] ?? value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="min-w-(--anchor-width)">
        {routing.locales.map((l) => (
          <SelectItem key={l} value={l}>
            {LABELS[l] ?? l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}