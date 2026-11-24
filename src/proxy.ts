import { NextResponse, type NextRequest } from 'next/server'

/**
 * Edge proxy (formerly `middleware` — Next 16 renamed the convention).
 *
 * Two jobs only: canonicalise the host, and 301 legacy `?lang=zh` URLs to the
 * `/zh` path. It no longer injects `x-pathname` / `content-language` headers,
 * because the `<html lang>` attribute now comes from a per-language root
 * layout. Injecting a header here forced every page into dynamic rendering
 * and still produced the wrong lang on cached HTML.
 */
export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''

  // www → apex
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = hostname.slice(4)
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // ?lang=zh → /zh/<path>. The query string is dropped so the two URLs never
  // both resolve to 200 (duplicate content) and so the redirect is cacheable.
  if (request.nextUrl.searchParams.get('lang') === 'zh') {
    const pathname = request.nextUrl.pathname
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? '/zh' : `/zh${pathname}`
    url.search = ''
    return NextResponse.redirect(url, 301)
  }

  // ?lang=en on an English page is a no-op duplicate: strip it, keep the path.
  const langParam = request.nextUrl.searchParams.get('lang')
  if (langParam === 'en' && !request.nextUrl.pathname.startsWith('/zh')) {
    const url = request.nextUrl.clone()
    url.searchParams.delete('lang')
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|og-image.svg|.*\\..*).*)'],
}
