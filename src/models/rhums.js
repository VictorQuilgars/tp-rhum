const mongoose = require('mongoose');

const rhumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rxid_number: { type: String, required: true },
  pays: { type: String, required: true },
  distillerie: { type: String, required: true },
  ABV: { type: String, required: true },
  categorie: { type: String, required: true },
  vintage: { type: String, required: true },
  fabriqueAvec: { type: String, required: true },
  distillation: { type: String, required: true },
  volume: { type: String, required: true },
  age: { type: String, required: true },
  type: { type: String, required: true },
  degre: { type: Number, required: true },
  imagePath: { type: String, required: true },
  visible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, select: false }
},
{ collection: "rhums-og" }
);

module.exports = mongoose.model('Rhum', rhumSchema);