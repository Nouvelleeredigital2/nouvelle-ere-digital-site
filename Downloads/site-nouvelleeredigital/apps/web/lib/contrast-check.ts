// Fonction utilitaire pour vérifier le contraste WCAG
function getContrastRatio(color1: string, color2: string): number {
  // Convertir les couleurs hex en RGB
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  // Calculer la luminance relative
  const lum1 = getLuminance(r1, g1, b1);
  const lum2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Vérification des contrastes pour chaque thème
console.log('=== VÉRIFICATION DES CONTRASTES WCAG ===');

// Test Ocean
console.log('Océan:', {
  'Primary sur Background': getContrastRatio('#0284c7', '#f8fafc'),
  'Foreground sur Background': getContrastRatio('#0f172a', '#f8fafc'),
  'Primary sur Card': getContrastRatio('#0284c7', '#ffffff'),
});

// Test Forest
console.log('Forêt:', {
  'Primary sur Background': getContrastRatio('#16a34a', '#f8fafc'),
  'Foreground sur Background': getContrastRatio('#14532d', '#f8fafc'),
  'Primary sur Card': getContrastRatio('#16a34a', '#ffffff'),
});

// Test Midnight
console.log('Minuit:', {
  'Primary sur Background': getContrastRatio('#1e1b4b', '#0f0f23'),
  'Foreground sur Background': getContrastRatio('#e0e7ff', '#0f0f23'),
  'Accent sur Card': getContrastRatio('#6366f1', '#1e1b4b'),
});

// Test Sunset
console.log('Sunset:', {
  'Primary sur Background': getContrastRatio('#f97316', '#fff7ed'),
  'Foreground sur Background': getContrastRatio('#9a3412', '#fff7ed'),
  'Primary sur Card': getContrastRatio('#f97316', '#ffffff'),
});
