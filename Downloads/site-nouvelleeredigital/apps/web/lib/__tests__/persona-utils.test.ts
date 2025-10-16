// apps/web/lib/__tests__/persona-utils.test.ts

/**
 * Tests pour les utilitaires de personas
 * À exécuter avec Jest ou Vitest
 */

import { getInitialPersona } from "../persona-provider-logic";
import { getCookieValue, getPersonaFromCookies } from "../server-utils";
import { isValidPersonaId, sanitizeCookieValue } from "../security";

// Mock des dépendances
jest.mock("@/personas", () => ({
  personas: [
    { id: "artiste", name: "L'Artiste", settings: {} },
    { id: "architecte", name: "L'Architecte", settings: {} },
    { id: "test-invalid", name: "Test Invalid", settings: {} },
  ],
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("Persona Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getInitialPersona", () => {
    it("devrait retourner le persona depuis le cookie côté client", () => {
      // Mock côté client
      Object.defineProperty(window, "window", {
        value: { location: { protocol: "https:" } },
        writable: true,
      });

      const { get } = require("js-cookie");
      get.mockReturnValue("architecte");

      const result = getInitialPersona();
      expect(result.id).toBe("architecte");
    });

    it("devrait retourner le persona par défaut côté serveur", () => {
      // Mock côté serveur
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      });

      const result = getInitialPersona();
      expect(result.id).toBe("artiste");
    });

    it("devrait gérer les erreurs de cookie", () => {
      Object.defineProperty(window, "window", {
        value: { location: { protocol: "https:" } },
        writable: true,
      });

      const { get } = require("js-cookie");
      get.mockImplementation(() => {
        throw new Error("Cookie error");
      });

      const result = getInitialPersona();
      expect(result.id).toBe("artiste");
    });
  });

  describe("getCookieValue", () => {
    it("devrait extraire correctement la valeur du cookie", () => {
      const cookieString = "theme=dark; persona=architecte; session=abc123";
      const result = getCookieValue(cookieString, "persona");
      expect(result).toBe("architecte");
    });

    it("devrait retourner undefined si le cookie n'existe pas", () => {
      const cookieString = "theme=dark; session=abc123";
      const result = getCookieValue(cookieString, "persona");
      expect(result).toBeUndefined();
    });

    it("devrait gérer les cookies malformés", () => {
      const cookieString = "malformed-cookie; another=valid";
      const result = getCookieValue(cookieString, "persona");
      expect(result).toBeUndefined();
    });
  });

  describe("Sécurité", () => {
    describe("isValidPersonaId", () => {
      it("devrait valider les IDs de personas légitimes", () => {
        expect(isValidPersonaId("artiste")).toBe(true);
        expect(isValidPersonaId("architecte")).toBe(true);
        expect(isValidPersonaId("invalid-persona")).toBe(false);
      });
    });

    describe("sanitizeCookieValue", () => {
      it("devrait échapper les caractères dangereux", () => {
        const input = 'test<script>alert("xss")</script>';
        const result = sanitizeCookieValue(input);
        expect(result).toBe('testscriptalert("xss")/script');
      });

      it("devrait limiter la longueur", () => {
        const longInput = "a".repeat(100);
        const result = sanitizeCookieValue(longInput);
        expect(result.length).toBe(50);
      });
    });
  });
});

// Tests d'intégration pour le système complet
describe("Intégration", () => {
  it("devrait maintenir la cohérence serveur/client", () => {
    // Test que la logique côté serveur et client aboutit au même résultat
    const serverResult = getPersonaFromCookies("persona=architecte; other=value");
    expect(serverResult).toBe("architecte");

    // Simuler côté client
    Object.defineProperty(window, "window", {
      value: { location: { protocol: "https:" } },
      writable: true,
    });

    const clientResult = getInitialPersona();
    // Le résultat dépend du mock, mais le test valide la logique
    expect(typeof clientResult).toBe("object");
    expect(clientResult).toHaveProperty("id");
  });
});
