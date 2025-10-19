import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Debug: afficher les identifiants reçus
    console.log('Tentative de connexion:', { email, password });

    // Vérification simple des identifiants (à remplacer par une vraie authentification)
    if (email === 'admin' && password === 'admin123') {
      // Créer un token simple (dans un vrai projet, utilisez JWT)
      const token = 'admin-auth-token-' + Date.now();
      
      const response = NextResponse.json({ 
        success: true, 
        message: 'Connexion réussie',
        user: {
          id: 'admin',
          email: 'admin@nouvelleeredigital.com',
          name: 'Administrateur',
          role: 'ADMIN'
        }
      });

      // Définir le cookie d'authentification
      response.cookies.set('admin-auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: '/'
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}