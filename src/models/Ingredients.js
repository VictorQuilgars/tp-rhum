const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["fruits", "épices", "sucres", "autres"],
    required: true
  },
  magasin: {
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    position: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ingredient", IngredientSchema);