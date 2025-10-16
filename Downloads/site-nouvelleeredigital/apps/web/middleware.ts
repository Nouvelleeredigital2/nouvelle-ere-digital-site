import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes admin qui nécessitent une authentification
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      // Rediriger vers la page de connexion
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Vérifier si la session est valide
    try {
      const session = JSON.parse(
        Buffer.from(sessionToken, 'base64').toString()
      );

      if (session.expiresAt < Date.now()) {
        // Session expirée
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('admin_session');
        return response;
      }
    } catch {
      // Token invalide
      const loginUrl = new URL('/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
