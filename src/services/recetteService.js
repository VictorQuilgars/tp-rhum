const Recette = require('../models/vqu-recettes');

exports.createRecette = async (data) => {
  const { nom, rhum, ingredients, instructions, publique } = data;

  const nouvelleRecette = new Recette({
    nom,
    rhum,
    ingredients,
    instructions,
    publique
  });

  return await nouvelleRecette.save();
};

exports.getAllRecettes = async () => {
  return await Recette.find({ publique: true });
};