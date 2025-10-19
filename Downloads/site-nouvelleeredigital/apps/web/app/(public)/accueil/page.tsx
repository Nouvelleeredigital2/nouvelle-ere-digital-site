import Link from 'next/link';

export default function AccueilPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Nouvelle Ère Digital
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bienvenue sur notre site web. Nous sommes en cours de construction de votre expérience digitale.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Administration
            </Link>
            <Link 
              href="/admin/pages" 
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Gérer les pages
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold mb-4">Éditeur Visuel</h3>
            <p className="text-gray-600 mb-4">
              Créez et modifiez vos pages avec notre éditeur visuel intuitif.
            </p>
            <Link 
              href="/admin/studio" 
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Commencer →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-2xl font-semibold mb-4">Gestion des Pages</h3>
            <p className="text-gray-600 mb-4">
              Organisez et gérez toutes vos pages en un seul endroit.
            </p>
            <Link 
              href="/admin/pages" 
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Voir les pages →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-2xl font-semibold mb-4">Configuration</h3>
            <p className="text-gray-600 mb-4">
              Configurez votre site et personnalisez l'expérience utilisateur.
            </p>
            <Link 
              href="/admin/settings" 
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Paramètres →
            </Link>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Pages Disponibles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/a-propos" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">📖</div>
              <h3 className="font-semibold">À Propos</h3>
            </Link>
            <Link href="/services" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🛠️</div>
              <h3 className="font-semibold">Services</h3>
            </Link>
            <Link href="/contact" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-semibold">Contact</h3>
            </Link>
            <Link href="/blog" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold">Blog</h3>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
