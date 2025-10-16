import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production';

export interface Session {
  userId: string;
  username: string;
  expiresAt: number;
}

export async function createSession(username: string): Promise<string> {
  const session: Session = {
    userId: '1',
    username,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 heures
  };

  const sessionToken = Buffer.from(JSON.stringify(session)).toString('base64');
  
  // Définir le cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 heures
    path: '/',
  });

  return sessionToken;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session: Session = JSON.parse(
      Buffer.from(sessionToken, 'base64').toString()
    );

    if (session.expiresAt < Date.now()) {
      await deleteSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
