import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger toutes les routes /admin
  if (pathname.startsWith('/admin')) {
    // Vérifier si l'utilisateur est authentifié
    // Pour l'instant, on utilise une vérification simple avec un cookie
    // Dans un vrai projet, vous utiliseriez NextAuth ou une autre solution d'auth
    
    const authToken = request.cookies.get('admin-auth')?.value;
    
    // Si pas de token, rediriger vers la page de login
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // TODO: Vérifier la validité du token et le rôle de l'utilisateur
    // Pour l'instant, on accepte tous les tokens
    
    return NextResponse.next();
  }

  // Protéger les API routes sensibles
  if (pathname.startsWith('/api/pages') && request.method !== 'GET') {
    const authToken = request.cookies.get('admin-auth')?.value;
    
    if (!authToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  if (pathname.startsWith('/api/upload') || pathname.startsWith('/api/media')) {
    const authToken = request.cookies.get('admin-auth')?.value;
    
    if (!authToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/pages/:path*',
    '/api/upload/:path*',
    '/api/media/:path*',
  ],
};
