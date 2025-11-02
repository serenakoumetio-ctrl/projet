

const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  imageCouverture: { type: String, default: null }
}, { timestamps: true });

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
