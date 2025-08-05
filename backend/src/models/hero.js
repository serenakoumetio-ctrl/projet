// models/HeroSection.js

const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  backgroundImageUrl: { type: String, required: true },  // URL image de fond
  title: { type: String, required: true },               // Titre principal
  description: { type: String, required: true },         // Description du site
  buttonText: { type: String, required: true },          // Texte du bouton
  buttonLink: { type: String, required: true },          // Lien (ex: '/#apropos')
});

module.exports = mongoose.model('HeroSection', heroSectionSchema);