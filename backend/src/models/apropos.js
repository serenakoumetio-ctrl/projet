// models/APropos.js

const mongoose = require('mongoose');

const aProposSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],  // Liste d'URLs d'images
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('APropos', aProposSchema);