const express = require("express");
const { addIngredient } = require("../controllers/ingredientController");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

router.post("/", protect, addIngredient);

module.exports = router;