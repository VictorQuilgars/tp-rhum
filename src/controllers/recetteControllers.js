const recetteService = require('../services/recetteService');

exports.createRecette = async (req, res) => {
  const { nom, rhum, ingredients, instructions, publique } = req.body;

  if (!nom || !rhum || !ingredients || ingredients.length === 0 || !instructions || instructions.length === 0) {
    return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
  }

  const recetteData = {
    nom,
    rhum,
    ingredients,
    instructions,
    publique: publique || false 
  };

  try {
    const recetteSauvee = await recetteService.createRecette(recetteData);
    res.status(201).json(recetteSauvee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};