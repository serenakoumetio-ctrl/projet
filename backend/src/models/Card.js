


const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  type: { 
    type: String, 
    enum: ["fonctionnalité", "avantage"], // Indique le type de carte
    required: true 
  },
  images: [{ 
    type: String 
  }], // Optionnel, utile pour les cartes "présentation"
}, { timestamps: true }); // Ajoute createdAt et updatedAt

module.exports = mongoose.model("Card", cardSchema);

