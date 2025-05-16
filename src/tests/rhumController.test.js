const request = require("supertest");
const express = require("express");

// Import du contrôleur
const rhumController = require("../controllers/rhumControllers");

// Mock du service
jest.mock("../services/rhumService");
const rhumService = require("../services/rhumService");

// Setup d'une mini app Express pour tester
const app = express();
app.get("/api/rhums", rhumController.getAllRhums);
app.get("/api/rhums/filter", rhumController.getRhumsWithFilter);

describe("Rhum Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/rhums", () => {
    it("doit retourner la liste des rhums (200)", async () => {
      const fakeRhums = [
        { name: "Bielle 2010", degre: 56.5 },
        { name: "Hampden 2020", degre: 60.2 }
      ];

      rhumService.getAllRhums.mockResolvedValue(fakeRhums);

      const res = await request(app).get("/api/rhums");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeRhums);
    });

    it("doit retourner une erreur 500 si échec service", async () => {
      rhumService.getAllRhums.mockRejectedValue(new Error("Erreur BDD"));

      const res = await request(app).get("/api/rhums");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur BDD");
    });
  });

  describe("GET /api/rhums/filter", () => {
    it("doit retourner les rhums filtrés", async () => {
      const filtered = [{ name: "Bielle", pays: "Marie Galante" }];
      rhumService.getRhumsWithFilter.mockResolvedValue(filtered);

      const res = await request(app).get("/api/rhums/filter?name=Bielle");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(filtered);
      expect(rhumService.getRhumsWithFilter).toHaveBeenCalledWith({ name: "Bielle" });
    });

    it("doit retourner 500 si erreur filtre", async () => {
      rhumService.getRhumsWithFilter.mockRejectedValue(new Error("Erreur filtre"));

      const res = await request(app).get("/api/rhums/filter?name=Plantation");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur filtre");
    });
  });
});