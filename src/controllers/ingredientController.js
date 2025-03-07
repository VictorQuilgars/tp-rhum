const Ingredient = require("../models/Ingredients");

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