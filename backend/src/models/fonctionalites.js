// models/Fonctionnalite.js

const mongoose = require('mongoose');

const avantageSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true }
});

const fonctionnaliteSchema = new mongoose.Schema({
  icone: { type: String }, // Nom de l’icône (optionnel)
  titre: { type: String, required: true },
  description: { type: String, required: true },
  avantages: [avantageSchema],
  dateAjout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fonctionnalite', fonctionnaliteSchema);