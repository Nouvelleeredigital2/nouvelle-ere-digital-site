export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Nos Services - Nouvelle Ère Digital
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Développement Web */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Développement Web</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Création de sites web modernes et performants avec les dernières technologies.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• React & Next.js</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• API REST</li>
                </ul>
              </div>
            </div>

            {/* Design UX/UI */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Design UX/UI</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Interfaces utilisateur intuitives et engageantes pour une expérience optimale.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Recherche utilisateur</li>
                  <li>• Prototypage</li>
                  <li>• Design System</li>
                  <li>• Tests d'utilisabilité</li>
                </ul>
              </div>
            </div>

            {/* Marketing Digital */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Marketing Digital</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Stratégies digitales pour augmenter votre visibilité et vos conversions.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• SEO & SEM</li>
                  <li>• Réseaux sociaux</li>
                  <li>• Email marketing</li>
                  <li>• Analytics</li>
                </ul>
              </div>
            </div>

            {/* Applications Mobile */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Applications Mobile</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Applications mobiles natives et cross-platform pour tous vos besoins.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• React Native</li>
                  <li>• Flutter</li>
                  <li>• iOS & Android</li>
                  <li>• PWA</li>
                </ul>
              </div>
            </div>

            {/* Intelligence Artificielle */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Intelligence Artificielle</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Solutions IA personnalisées pour automatiser et optimiser vos processus.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Machine Learning</li>
                  <li>• Chatbots</li>
                  <li>• Automatisation</li>
                  <li>• Analyse prédictive</li>
                </ul>
              </div>
            </div>

            {/* Conseil Digital */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Conseil Digital</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Accompagnement stratégique pour votre transformation digitale.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Audit digital</li>
                  <li>• Stratégie</li>
                  <li>• Formation</li>
                  <li>• Accompagnement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-indigo-600 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Nos experts sont à votre disposition pour discuter de vos besoins et vous proposer la solution la plus adaptée.
            </p>
            <div className="space-x-4">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Demander un devis
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                Prendre contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}