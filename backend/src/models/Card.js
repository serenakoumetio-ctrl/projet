const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    description: { 
      type: String, 
      required: true,
      trim: true 
    },
    imageUrl: { 
      type: String, 
      default: "" // champ optionnel, vide par défaut
    }
  },
  { timestamps: true } // createdAt et updatedAt automatiques
);

module.exports = mongoose.model("Card", CardSchema);
