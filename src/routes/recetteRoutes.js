const express = require("express");
const { createRecette, getAllRecettes, getMyRecettes } = require("../controllers/recetteControllers");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

router.get("/", protect, getAllRecettes);
router.post("/create", protect, createRecette);
router.get("/mes-recettes", protect, getMyRecettes);


module.exports = router;