const express = require("express");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser
const { getAllRhums, getRhumsWithFilter } = require("../controllers/rhumControllers");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rhums
 *   description: Gestion des rhums
 */


/**
 * @swagger
 * /api/rhums:
 *   get:
 *     summary: Lister tous les rhums
 *     tags: [Rhums]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les rhums
 *       500:
 *         description: Erreur serveur
 */
router.get("/", protect, getAllRhums);

/**
 * @swagger
 * /api/rhums/getRhums:
 *   get:
 *     summary: Rechercher des rhums avec des filtres
 *     tags: [Rhums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nom du rhum
 *       - in: query
 *         name: distillerie
 *         schema:
 *           type: string
 *         description: Nom de la distillerie
 *       - in: query
 *         name: pays
 *         schema:
 *           type: string
 *         description: Pays d'origine
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Catégorie du rhum
 *     responses:
 *       200:
 *         description: Liste des rhums filtrés
 *       500:
 *         description: Erreur serveur
 */
router.get("/getRhums", protect, getRhumsWithFilter);

module.exports = router;