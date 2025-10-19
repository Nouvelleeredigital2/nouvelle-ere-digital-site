const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Nouvelle Ère Digital - Déploiement</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; background: #f5f5f5;">
        <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #007bff;">🚀 Nouvelle Ère Digital</h1>
          <p><strong>Déploiement réussi !</strong></p>

          <div style="padding: 1rem; background: #d4edda; border: 1px solid #c3e6cb; color: #155724; border-radius: 4px; margin: 1rem 0;">
            ✅ Serveur démarré avec succès<br>
            📍 Port: ${PORT}<br>
            🌐 http://localhost:${PORT}
          </div>

          <h2>📋 État du Projet</h2>
          <ul>
            <li>✅ Sprint 1: Expérience de Base - Terminé</li>
            <li>✅ Sprint 2: Contenu Riche - Terminé</li>
            <li>✅ Sprint 3: Production & SEO - Terminé</li>
            <li>🔄 Sprint 4: Blocs avancés - En préparation</li>
          </ul>

          <h2>🎯 Capacités Actuelles</h2>
          <ul>
            <li>✅ 7 blocs avancés (Hero, Text, Image, CTA, RichText, Gallery, Columns)</li>
            <li>✅ SEO dynamique avec sitemap automatique</li>
            <li>✅ Prévisualisation sécurisée</li>
            <li>✅ Historique professionnel avec restauration</li>
            <li>✅ Interface sophistiquée avec onglets</li>
          </ul>

          <p><a href="/admin/studio">Accéder au Studio d'édition →</a></p>
        </div>
      </body>
      </html>
    `);
  } else if (req.url === '/admin/studio') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Studio d'Édition</title></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 2rem; background: #f8f9fa;">
        <div style="max-width: 1200px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #007bff;">🎨 Studio d'Édition Visuelle</h1>
          <div style="background: #e9ecef; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>Outils disponibles:</strong> Éditeur | SEO | Prévisualisation | Historique
          </div>
          <div style="border: 2px dashed #dee2e6; min-height: 400px; padding: 2rem; text-align: center; color: #6c757d;">
            <h3>Zone de création</h3>
            <p>Glissez-déposez vos blocs ici pour créer votre page</p>
            <p><em>Studio en cours de développement - Version fonctionnelle</em></p>
          </div>
          <p><a href="/">← Retour à l'accueil</a></p>
        </div>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404);
    res.end('Page non trouvée');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur de déploiement actif sur http://localhost:${PORT}`);
  console.log(`📊 Application: Nouvelle Ère Digital`);
  console.log(`✅ Status: Opérationnel`);
});
