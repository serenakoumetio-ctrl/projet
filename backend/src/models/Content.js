const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true,
    enum: ['accueil', 'apropos', 'fonctionnalite', 'homepage', 'footer', 'navbar']
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les recherches
ContentSchema.index({ section: 1 });

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
