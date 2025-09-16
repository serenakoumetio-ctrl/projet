const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
//const { verifyToken, isAdmin } = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs");
//const cloudinary = require("../utils/cloudinary");

// Multer pour upload temporaire
const upload = multer({ dest: "temp_uploads/" });

// GET toutes les cards (public)
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une card par ID (public)
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card non trouvée" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST une nouvelle card (admin)
router.post("/",  upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "cards" });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const { title, description } = req.body;
    const card = await Card.create({ title, description, imageUrl });
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// DELETE une card (admin)
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ error: "Card non trouvée" });
    res.json({ message: "Card supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
