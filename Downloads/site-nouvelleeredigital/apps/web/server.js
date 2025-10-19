import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Nouvelle Ère Digital - Déploiement Test</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #007bff; }
        .status { padding: 1rem; background: #e7f3ff; border-radius: 4px; margin: 1rem 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Nouvelle Ère Digital</h1>
        <p><strong>Déploiement de test réussi !</strong></p>

        <div class="status success">
          ✅ Serveur Express démarré avec succès<br>
          📍 Port: ${PORT}<br>
          🌐 Application accessible sur http://localhost:${PORT}
        </div>

        <h2>📋 État du Projet</h2>
        <ul>
          <li>✅ Sprint 3: Production & SEO - Terminé</li>
          <li>✅ 7 blocs avancés opérationnels</li>
          <li>✅ Prévisualisation sécurisée</li>
          <li>✅ Historique professionnel</li>
          <li>🔄 Sprint 4: Blocs avancés - En préparation</li>
        </ul>

        <h2>🎯 Prochaines Étapes</h2>
        <ol>
          <li>Accéder au <a href="/admin/studio">Studio d'édition</a></li>
          <li>Préparer le Sprint 4 (blocs avancés)</li>
          <li>Déployer en production</li>
        </ol>

        <div class="status">
          <strong>Environnement:</strong> Node.js v22.20.0<br>
          <strong>Serveur:</strong> Express.js<br>
          <strong>Status:</strong> ✅ Opérationnel
        </div>
      </div>
    </body>
    </html>
  `);
});

// Route admin
app.get('/admin/studio', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Studio d'Édition - Nouvelle Ère Digital</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 2rem;
          background: #f8f9fa;
        }
        .studio {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #007bff; }
        .toolbar {
          background: #e9ecef;
          padding: 1rem;
          border-radius: 4px;
          margin: 1rem 0;
        }
        .canvas {
          border: 2px dashed #dee2e6;
          min-height: 400px;
          padding: 2rem;
          text-align: center;
          color: #6c757d;
        }
      </style>
    </head>
    <body>
      <div class="studio">
        <h1>🎨 Studio d'Édition Visuelle</h1>

        <div class="toolbar">
          <strong>Outils:</strong> Éditeur | SEO | Prévisualisation | Historique
        </div>

        <div class="canvas">
          <h3>Zone de création</h3>
          <p>Glissez-déposez vos blocs ici pour créer votre page</p>
          <p><em>Studio en cours de développement - Version de démonstration</em></p>
        </div>

        <p><a href="/">← Retour à l'accueil</a></p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📁 Répertoire: ${__dirname}`);
});
