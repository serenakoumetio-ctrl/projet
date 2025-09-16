const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  submenu: [
    {
      title: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
      order: { type: Number, default: 0 }
    }
  ]
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
