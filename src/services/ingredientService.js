const Ingredient = require('../models/vqu-ingredients');

exports.searchIngredients = async (query) => {
  const { nom, type } = query;

  let filter = {};

  if (nom) {
    filter.nom = { $regex: nom, $options: "i" }; // Recherche insensible à la casse
  }

  if (type) {
    filter.type = type;
  }

  return await Ingredient.find(filter);
};

exports.createIngredient = async (data) => {
    const { nom, type, magasin, prix, description } = data;
  
    const existingIngredient = await Ingredient.findOne({ nom });
    if (existingIngredient) {
      throw new Error("Cet ingrédient existe déjà.");
    }
  
    const newIngredient = new Ingredient({
      nom,
      type,
      magasin,
      prix,
      description
    });
  
    return await newIngredient.save();
};

exports.getAllIngredients = async () => {
    return await Ingredient.find();
};

