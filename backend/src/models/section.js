const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true //Supprime les espaces au début/fin automatiquement.
  },
  contenu: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  position: { //C’est pour définir l’ordre d’affichage de la section dans la page (1, 2, 3, etc.).
    type: Number,
    required: true
  },
  page: {
    type: mongoose.Schema.Types.ObjectId, //ObjectId → identifiant unique d’un autre document MongoDB.
    ref: 'Page', //fait référence au modèle Page
    required: true
  },
  options: { //Ce champ te permet de personnaliser l'apparence visuelle de la section.
    backgroundColor: { type: String },
    textColor: { type: String },
    fontFamily: { type: String },
    padding: { type: String },
    margin: { type: String }
  }
}, {
  timestamps: true // ajoute automatiquement la date de creation et la date de derniere modification
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section; //Rend le modèle accessible aux autres fichiers