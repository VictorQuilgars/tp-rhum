const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");

// Le contrôleur qu'on teste
const authController = require("../controllers/authController");

// Mock du service d'authentification
jest.mock("../services/authService");
const authService = require("../services/authService");

// Création d'une mini app Express pour tester le contrôleur
const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

describe("Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("doit enregistrer un utilisateur et renvoyer un cookie + userId", async () => {
      authService.register.mockResolvedValue({
        token: "mocked.jwt.token",
        userId: "user123"
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({ nom: "Victor", email: "victor@mail.com", password: "123", adresse: "10 rue de test" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: "Inscription réussie",
        userId: "user123"
      });
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("doit retourner une erreur 400 si l'email est déjà utilisé", async () => {
      authService.register.mockRejectedValue(new Error("Email already in use"));

      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "existant@mail.com", password: "123" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email already in use");
    });
  });

  describe("POST /login", () => {
    it("doit connecter un utilisateur et renvoyer un cookie + userId", async () => {
      authService.login.mockResolvedValue({
        token: "mocked.jwt.token",
        userId: "user456"
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@mail.com", password: "123" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Connexion réussie");
      expect(res.body.userId).toBe("user456");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("doit retourner une erreur 400 si mauvais identifiants", async () => {
      authService.login.mockRejectedValue(new Error("Wrong email or password"));

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "wrong@mail.com", password: "wrongpass" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Wrong email or password");
    });

    it("doit retourner une erreur 500 pour toute autre erreur", async () => {
      authService.login.mockRejectedValue(new Error("Database is down"));

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@mail.com", password: "123" });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Database is down");
    });
  });
});