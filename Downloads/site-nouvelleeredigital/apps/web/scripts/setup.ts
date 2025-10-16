import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔧 Configuration initiale de l\'éditeur visuel...');
console.log('');

// Vérifier si le fichier .env existe
const envPath = join(process.cwd(), '.env');

if (!existsSync(envPath)) {
  console.log('📝 Création du fichier .env...');
  
  const envContent = `# Base de données SQLite
DATABASE_URL="file:./prisma/dev.db"

# Secret pour les sessions (changez en production)
SESSION_SECRET="dev-secret-change-in-production-${Math.random().toString(36).substring(7)}"

# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3001
`;

  writeFileSync(envPath, envContent);
  console.log('✅ Fichier .env créé');
} else {
  console.log('✅ Fichier .env existe déjà');
}

console.log('');
console.log('🎯 Prochaines étapes:');
console.log('');
console.log('1. Générer le client Prisma:');
console.log('   npm run db:generate');
console.log('');
console.log('2. Créer la base de données:');
console.log('   npm run db:migrate');
console.log('');
console.log('3. Peupler avec des données d\'exemple:');
console.log('   npm run db:seed');
console.log('');
console.log('4. Démarrer le serveur:');
console.log('   npm run dev');
console.log('');
console.log('5. Se connecter à l\'admin:');
console.log('   http://localhost:3001/login');
console.log('   Username: admin');
console.log('   Password: admin123');
console.log('');
