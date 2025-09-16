const express = require('express');
const router = express.Router();
const Message = require('../models/Messag'); // Vérifie bien le nom du fichier

// POST -> créer un message
router.post('/', async (req, res) => {
  try {
    const { nom, email, message } = req.body;

    const nouveauMessage = new Message({ nom, email, message });
    await nouveauMessage.save();

    res.status(201).json({ success: true, message: 'Message enregistré avec succès !' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


// GET -> récupérer tous les messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Les plus récents en premier
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages', error });
  }
});

// DELETE -> supprimer un message
router.delete('/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Message non trouvé" });
    }

    res.status(200).json({ success: true, message: "Message supprimé avec succès !" });
  } catch (error) {
    console.error("Erreur DELETE /messages/:id:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
