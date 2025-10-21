import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schéma de validation pour le formulaire de contact
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const validation = ContactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Données invalides', 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, company, phone, service, budget, message } = validation.data;

    // Ici, vous pouvez :
    // 1. Sauvegarder en base de données
    // 2. Envoyer un email
    // 3. Intégrer avec un CRM
    // 4. Envoyer une notification Slack/Discord
    
    console.log('📧 Nouveau message de contact reçu:');
    console.log('  Nom:', name);
    console.log('  Email:', email);
    console.log('  Entreprise:', company || 'Non spécifiée');
    console.log('  Téléphone:', phone || 'Non spécifié');
    console.log('  Service:', service);
    console.log('  Budget:', budget || 'Non spécifié');
    console.log('  Message:', message);

    // Simulation d'un envoi d'email (à remplacer par un vrai service)
    await simulateEmailSending({
      name,
      email,
      company: company || '',
      phone: phone || '',
      service,
      budget: budget || '',
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Nous vous recontacterons rapidement.',
    });

  } catch (error) {
    console.error('❌ Erreur lors du traitement du formulaire:', error);
    return NextResponse.json(
      { 
        error: 'Erreur serveur', 
        message: 'Une erreur est survenue. Veuillez réessayer.' 
      },
      { status: 500 }
    );
  }
}

// Fonction de simulation d'envoi d'email
async function simulateEmailSending(_data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  // Simulation d'un délai d'envoi
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Ici, vous pouvez intégrer :
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer
  // - Resend
  
  console.log('📤 Email envoyé (simulation)');
  
  // Exemple avec Nodemailer (à décommenter et configurer) :
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_EMAIL,
    subject: `Nouveau message de contact - ${data.name}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Entreprise:</strong> ${data.company || 'Non spécifiée'}</p>
      <p><strong>Téléphone:</strong> ${data.phone || 'Non spécifié'}</p>
      <p><strong>Service:</strong> ${data.service}</p>
      <p><strong>Budget:</strong> ${data.budget || 'Non spécifié'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
  */
}
