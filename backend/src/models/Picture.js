const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      trim: true // facultatif
    },
    description: { 
      type: String, 
      trim: true // facultatif
    },
    image: { 
      type: Buffer, // stocke le fichier directement
      required: true
    },
    contentType: { 
      type: String, // type MIME (ex: "image/png")
      required: true
    }
  },
  { timestamps: true } // createdAt et updatedAt automatiques
);

module.exports = mongoose.model('Picture', PictureSchema);
