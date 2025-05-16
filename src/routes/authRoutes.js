const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware"); 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un compte utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - password
 *               - adresse
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Jean Dupont
 *               email:
 *                 type: string
 *                 example: jean@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *               adresse:
 *                 type: string
 *                 example: 10 rue des Rhums
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter (stocke le token JWT dans un cookie)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jean@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie (le token est envoyé dans un cookie nommé "token")
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Déconnecte l'utilisateur
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.get("/logout", logout);

router.get("/me", protect, async (req, res) => {
    try {
      res.status(200).json(req.user); // req.user est défini dans le middleware
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
  });

module.exports = router;