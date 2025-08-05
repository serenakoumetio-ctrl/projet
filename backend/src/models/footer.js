
// models/Footer.js

const mongoose = require('mongoose');

const lienUtileSchema = new mongoose.Schema({
  label: { type: String, required: true },  // Texte du lien
  url: { type: String, required: true }     // URL du lien
});

const footerSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    required: true
  },
  droits: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    default: ''
  },
  liensUtiles: [lienUtileSchema]
});

module.exports = mongoose.model('Footer', footerSchema);