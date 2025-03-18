const express = require("express");
const { addIngredient, searchIngredients, getAllIngredients,  } = require("../controllers/ingredientController");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser

const router = express.Router();

router.post("/add", protect, addIngredient);
router.get("/search", protect, searchIngredients);
router.get("/all-ingredients", protect, getAllIngredients);

module.exports = router;