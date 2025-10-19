import { redirect } from 'next/navigation';

export default function HomePage() {
  // Rediriger vers la page d'accueil du site
  redirect('/accueil');
}
