const express = require("express");
const { addIngredient, searchIngredients, getAllIngredient,  } = require("../controllers/ingredientController");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

router.post("/", protect, addIngredient);
router.get("/search", protect, searchIngredients);
router.get("/all-ingredients", protect, getAllIngredient);

module.exports = router;