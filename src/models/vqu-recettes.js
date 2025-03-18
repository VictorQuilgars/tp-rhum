const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  rhum: { type: mongoose.Schema.Types.ObjectId, ref: 'Rhum', required: true },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true
    }
  ],
  instructions: { type: [String], required: true },
  publique: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},
);

module.exports = mongoose.model('vqu-recettes', recetteSchema);