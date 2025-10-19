'use client';

export default function TestPage() {
  const handleLogin = () => {
    // Créer le cookie d'authentification
    document.cookie = 'admin-auth=test-token-' + Date.now() + '; path=/; max-age=604800';
    alert('Cookie créé ! Vous pouvez maintenant accéder à /admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Test d'Authentification
          </h1>
          
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Créer Cookie d'Authentification
            </button>
            
            <a
              href="/admin"
              className="block w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-center"
            >
              Aller à l'Admin
            </a>
            
            <a
              href="/admin/studio"
              className="block w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 text-center"
            >
              Aller au Studio
            </a>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>1. Cliquez sur "Créer Cookie"</p>
            <p>2. Cliquez sur "Aller à l'Admin"</p>
            <p>3. Vous devriez accéder sans problème</p>
          </div>
        </div>
      </div>
    </div>
  );
}