const express = require("express");
const { addIngredient, searchIngredients, getAllIngredients,  } = require("../controllers/ingredientController");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ingrédients
 *   description: Gestion des ingrédients
 */


/**
 * @swagger
 * /api/ingredients/add:
 *   post:
 *     summary: Ajouter un ingrédient
 *     tags: [Ingrédients]
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
 *               - type
 *               - magasin
 *               - prix
 *             properties:
 *               nom:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [fruits, épices, sucres, autres]
 *               magasin:
 *                 type: object
 *                 properties:
 *                   nom:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   position:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                       longitude:
 *                         type: number
 *               prix:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingrédient ajouté avec succès
 *       400:
 *         description: Tous les champs requis ne sont pas remplis ou type d'ingrédient invalide ou prix invalide
 *       409:
 *         description: Cet ingrédient existe déjà
 *       500:
 *         description: Erreur serveur
 */
router.post("/add", protect, addIngredient);

/**
 * @swagger
 * /api/ingredients/search:
 *   get:
 *     summary: Rechercher des ingrédients
 *     tags: [Ingrédients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Nom de l'ingrédient
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [fruits, épices, sucres, autres]
 *         description: Type de l'ingrédient
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *       500:
 *         description: Erreur serveur
 */
router.get("/search", protect, searchIngredients);

/**
 * @swagger
 * /api/ingredients/all-ingredients:
 *   get:
 *     summary: Lister tous les ingrédients
 *     tags: [Ingrédients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les ingrédients
 *       500:
 *         description: Erreur serveur
 */
router.get("/all-ingredients", protect, getAllIngredients);

module.exports = router;