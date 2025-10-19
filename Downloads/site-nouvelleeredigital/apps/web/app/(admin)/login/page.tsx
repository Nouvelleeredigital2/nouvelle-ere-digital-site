'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Tentative de connexion avec:', credentials);

    // Vérification côté client d'abord
    if (credentials.email === 'admin' && credentials.password === 'admin123') {
      try {
        // Créer le cookie côté client
        document.cookie = 'admin-auth=admin-token-' + Date.now() + '; path=/; max-age=604800';
        
        // Rediriger vers l'admin
        router.push('/admin');
        return;
      } catch (err) {
        console.error('Erreur lors de la connexion:', err);
        setError('Erreur de connexion');
      }
    } else {
      setError('Identifiants incorrects. Utilisez admin/admin123');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Connexion Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nouvelle Ère Digital - Studio
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p className="font-medium">Identifiants par défaut :</p>
          <p>Email: <code className="bg-gray-100 px-1 rounded">admin</code></p>
          <p>Mot de passe: <code className="bg-gray-100 px-1 rounded">admin123</code></p>
        </div>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setCredentials({ email: 'admin', password: 'admin123' });
            }}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Remplir automatiquement
          </button>
        </div>
      </div>
    </div>
  );
}
