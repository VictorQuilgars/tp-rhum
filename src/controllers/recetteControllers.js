const Recette = require('../models/vqu-recettes');

exports.createRecette = async (req, res) => {
  const { nom, rhum, ingredients, instructions, publique } = req.body;

  if (!nom || !rhum || !ingredients || ingredients.length === 0 || !instructions || instructions.length === 0) {
    return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
  }

  try {
    const nouvelleRecette = new Recette({
      nom,
      rhum,
      ingredients,
      instructions,
      publique
    });

    const recetteSauvee = await nouvelleRecette.save();
    res.status(201).json(recetteSauvee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};