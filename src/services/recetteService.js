const Recette = require('../models/vqu-recettes');

exports.createRecette = async (data) => {
  const { nom, rhum, ingredients, instructions, publique, user } = data;

  const nouvelleRecette = new Recette({
    nom,
    rhum,
    ingredients,
    instructions,
    publique, 
    user
  });

  return await nouvelleRecette.save();
};

exports.getAllRecettes = async () => {
  return await Recette.find({ publique: true });
};

exports.getMyRecettes = async (userId) => {
  return await Recette.find({ user: userId });
}

exports.updateRecette = async (recetteId, data) => {
  return await Recette.findByIdAndUpdate(recetteId, data, { new: true });
}