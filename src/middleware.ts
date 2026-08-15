import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  // www 重定向到 apex
  if (hostname.startsWith('www.')) {
    const apex = hostname.slice(4);  // strip 'www.'
    const url = request.nextUrl.clone();
    url.host = apex;
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  // 语言参数重定向
  const langParam = request.nextUrl.searchParams.get('lang');
  if (langParam === 'zh') {
    // ?lang=zh → /zh/<path>
    const pathname = request.nextUrl.pathname;
    const target = pathname === '/' ? '/zh' : `/zh${pathname}`;
    const url = request.nextUrl.clone();
    url.pathname = target;
    url.search = '';
    return NextResponse.redirect(url, 301);
  }
  if (langParam === 'en') {
    // ?lang=en → /<path>（英文是默认语言，去掉参数）
    const url = request.nextUrl.clone();
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  // zh 路由用 zh-CN, 其他用 en
  const lang = pathname.startsWith('/zh') ? 'zh-CN' : 'en-US';
  response.headers.set('x-pathname', pathname);
  response.headers.set('content-language', lang);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|og-image.svg|.*\\..*).*)'],
};