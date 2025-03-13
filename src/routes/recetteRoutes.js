const express = require("express");
const { createRecette } = require("../controllers/recetteControllers");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

//router.get("/", protect, getAllRecettes);
router.post("/create", protect, createRecette);


module.exports = router;