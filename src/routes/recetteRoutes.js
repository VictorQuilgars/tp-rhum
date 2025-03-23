const express = require("express");
const { createRecette, getAllRecettes, getMyRecettes, updateRecette } = require("../controllers/recetteControllers");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

router.get("/", protect, getAllRecettes);
router.post("/create", protect, createRecette);
router.get("/mes-recettes", protect, getMyRecettes);
router.patch("/update/:id", protect, updateRecette);


module.exports = router;