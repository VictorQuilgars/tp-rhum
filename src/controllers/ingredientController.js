const ingredientService = require('../services/ingredientService');

exports.addIngredient = async (req, res) => {
  try {
    const { nom, type, magasin, prix, description } = req.body;

    if (!nom || !type || !magasin?.nom || !magasin?.adresse || !magasin?.position || !prix) {
      return res.status(400).json({ message: "Tous les champs requis ne sont pas remplis." });
    }

    const validTypes = ["fruits", "épices", "sucres", "autres"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Type d'ingrédient invalide." });
    }

    if (prix <= 0) {
      return res.status(400).json({ message: "Le prix doit être supérieur à 0." });
    }

    const newIngredient = await ingredientService.createIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    if (error.message === "Cet ingrédient existe déjà.") {
      res.status(409).json({ message: error.message }); // Conflit : l'ingrédient existe déjà
    } else {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
};

exports.searchIngredients = async (req, res) => {
  try {
    const ingredients = await ingredientService.searchIngredients(req.query);
    res.status(200).json({
      message: "Résultats de la recherche",
      total: ingredients.length,
      ingredients,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.status(200).json({
      message: "Liste de tous les ingrédients",
      total: ingredients.length,
      ingredients,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
