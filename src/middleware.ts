import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Redirect old ?lang=zh URLs to /zh/<slug>
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const lang = url.searchParams.get('lang')

  // Only handle ?lang=zh (en is default and no need to redirect /<slug>?lang=en)
  if (lang === 'zh') {
    const path = url.pathname
    // /?lang=zh -> /zh
    // /<slug>?lang=zh -> /zh/<slug>
    const newPath = path === '/' ? '/zh' : `/zh${path}`
    const newUrl = new URL(newPath, request.url)
    newUrl.search = ''
    return NextResponse.redirect(newUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Run on all pages except _next, api, static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.js|.*\\.css|.*\\.svg|.*\\.png).*)',
  ],
}
