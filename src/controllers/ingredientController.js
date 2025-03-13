const Ingredient = require("../models/vqu-ingredients");

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

    if (await Ingredient.findOne({ nom })) {
      return res.status(400).json({ message: "Cet ingrédient existe déjà." });
    }

    if (prix <= 0) {
      return res.status(400).json({ message: "Le prix doit être supérieur à 0." });
    }

    const newIngredient = new Ingredient({
      nom,
      type,
      magasin,
      prix,
      description
    });

    await newIngredient.save();
    
    res.status(201).json({
      message: "Ingrédient ajouté avec succès !",
      ingredient: newIngredient
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.searchIngredients = async (req, res) => {
    try {
        const { nom, type } = req.query;

        let filter = {};

        if (nom) {
        filter.nom = { $regex: nom, $options: "i" }; // Recherche insensible à la casse
        }

        if (type) {
        filter.type = type;
        }

        const ingredients = await Ingredient.find(filter);

        res.status(200).json({
        message: "Résultats de la recherche",
        total: ingredients.length,
        ingredients,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.getAllIngredient = async (req, res) => 
{
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json({
      message: "Liste de tous les ingrédients",
      total: ingredients.length,
      ingredients,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}
