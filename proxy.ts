// proxy.ts
import {NextResponse, type NextRequest} from 'next/server';
import {hasLocale} from 'next-intl';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Matches things like "fr", "de", "pt-BR", "zh-hans"
const LOCALE_LIKE = /^[a-z]{2}(?:-[a-z]{2,4})?$/i;

export default function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const first = pathname.split('/')[1];

  if (first && LOCALE_LIKE.test(first) && !hasLocale(routing.locales, first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${pathname.slice(first.length + 1)}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};