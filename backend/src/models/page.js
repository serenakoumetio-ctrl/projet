const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  imageCouverture: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;