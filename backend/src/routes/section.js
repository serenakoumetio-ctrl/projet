const express = require("express");
const router = express.Router();
const Section = require("../models/Section");
//const { verifyToken, isAdmin } = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs");
//const cloudinary = require("../utils/cloudinary");

// Multer pour upload temporaire
const upload = multer({ dest: "temp_uploads/" });

// GET toutes les sections (optionnel : filtrer par page)
router.get("/", async (req, res) => {
  try {
    const { pageId } = req.query;
    const filter = pageId ? { page: pageId } : {};
    const sections = await Section.find(filter).sort({ position: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une section par ID
router.get("/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ error: "Section non trouvée" });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une nouvelle section (admin)
router.post("/",  upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "sections" });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const { titre, contenu, position, page, options } = req.body;
    const section = await Section.create({ titre, contenu, position, page, options, imageUrl });
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT modifier une section (admin)
router.put("/:id",  upload.single("image"), async (req, res) => {
  try {
    const updates = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "sections" });
      updates.imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const section = await Section.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE une section (admin)
router.delete("/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ error: "Section non trouvée" });
    res.json({ message: "Section supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
