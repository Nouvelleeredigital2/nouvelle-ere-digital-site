import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

// Identifiants simples pour le développement
// En production, utilisez une base de données avec des mots de passe hashés
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérifier les identifiants
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      await createSession(username);
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
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
