// shared/theme.types.ts

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string; // Couleur du texte principal
    card: string;       // Fond des cartes
    border: string;
  };
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
    };
    fontSize: {
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };
  styles: {
    borderRadius: string;
    cardShadow: string;
    buttonPadding: string;
  };
}
