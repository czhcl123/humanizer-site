import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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