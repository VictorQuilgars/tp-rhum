const express = require("express");
const { createRecette, getAllRecettes, getMyRecettes, updateRecette } = require("../controllers/recetteControllers");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recettes
 *   description: Gestion des recettes
 */

/**
 * @swagger
 * /api/recettes:
 *   get:
 *     summary: Lister les recettes publiques
 *     tags: [Recettes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des recettes publiques
 *       500:
 *         description: Erreur serveur
 */
router.get("/", protect, getAllRecettes);

/**
 * @swagger
 * /api/recettes/create:
 *   post:
 *     summary: Créer une recette
 *     tags: [Recettes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - rhum
 *               - ingredients
 *               - instructions
 *             properties:
 *               nom:
 *                 type: string
 *               rhum:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               publique:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Recette créée avec succès
 *       400:
 *         description: Tous les champs requis doivent être remplis
 *       500:
 *         description: Erreur serveur
 */
router.post("/create", protect, createRecette);

/**
 * @swagger
 * /api/recettes/mes-recettes:
 *   get:
 *     summary: Lister les recettes de l'utilisateur connecté
 *     tags: [Recettes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des recettes de l'utilisateur connecté
 *       500:
 *         description: Erreur serveur
 */
router.get("/mes-recettes", protect, getMyRecettes);

/**
 * @swagger
 * /api/recettes/update/{id}:
 *   patch:
 *     summary: Modifier une recette
 *     tags: [Recettes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               rhum:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               publique:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Recette modifiée avec succès
 *       404:
 *         description: Recette non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.patch("/update/:id", protect, updateRecette);


module.exports = router;