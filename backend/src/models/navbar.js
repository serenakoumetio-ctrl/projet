// models/Navbar.js

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  label: { type: String, required: true },      // Exemple : "À propos"
  link: { type: String, required: true },       // Exemple : "#apropos"
});

const navbarSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },           // URL du logo
  siteTitle: { type: String, required: true },         // "GOV-AI"
  showThemeToggle: { type: Boolean, default: true },   // Bouton thème
  showLanguageToggle: { type: Boolean, default: true },// Bouton langue
  menuItems: [menuItemSchema],                         // Liste des menus
});

module.exports = mongoose.model('Navbar', navbarSchema);