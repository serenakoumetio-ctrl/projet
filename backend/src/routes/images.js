const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/Picture');

// Multer en mémoire pour récupérer le fichier en Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ======================
// GET -> récupérer toutes les images
// ======================
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }); //On récupère toutes les images depuis MongoDB grâce à Image.find()..sort({ createdAt: -1 }) trie les images par date de création décroissante
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// POST -> ajouter une nouvelle image
// ======================
router.post('/', upload.single('image'), async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier téléchargé' });

    const { title, description } = req.body;
    const image = await Image.create({
      title,
      description,
      image: req.file.buffer,
      contentType: req.file.mimetype
    });

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// PUT -> modifier une image
// ======================
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description
    };

    if (req.file) {
      updates.image = req.file.buffer;
      updates.contentType = req.file.mimetype;
    }

    const image = await Image.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!image) return res.status(404).json({ error: 'Image non trouvée' });

    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// DELETE -> supprimer une image
// ======================
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image non trouvée' });

    res.json({ message: 'Image supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
