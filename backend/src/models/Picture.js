

//  const mongoose = require('mongoose');

// const pictureSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   imageFilename: String
// }, { timestamps: true });

// module.exports = mongoose.model('Picture', pictureSchema);

// const newImage = new Picture({
//   title: req.body.title,
//   description: req.body.description,
//   url: req.file.filename, 
//   uploader: req.body.uploader
// });


const mongoose = require("mongoose");

// Définition du schéma de l'image
const pictureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // le titre est obligatoire
  },
  description: {
    type: String,
    required: false, // facultatif
  },
  url: {
    type: String,
    required: true, // chemin/nom du fichier image
  },
  uploader: {
    type: String,
    required: false, // nom ou identifiant de l'uploader
  },
  createdAt: {
    type: Date,
    default: Date.now, // date d'upload automatique
  },
});

// Création du modèle "Picture"
const Picture = mongoose.model("Picture", pictureSchema);

// Export du modèle pour l'utiliser dans les routes
module.exports = Picture;
