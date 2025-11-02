const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const messagesFile = path.join(__dirname, '../data/messages.json');

// Charger les messages
const loadMessages = () => {
  try {
    if (fs.existsSync(messagesFile)) {
      return JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    }
  } catch (error) {
    console.error('Erreur lecture messages:', error);
  }
  
  return [];
};

// Sauvegarder les messages
const saveMessages = (messages) => {
  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur sauvegarde messages:', error);
    return false;
  }
};

// POST - Recevoir un nouveau message
router.post('/', (req, res) => {
  const { nom, email, message } = req.body;

  // Validation basique
  if (!nom || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont obligatoires'
    });
  }

  const messages = loadMessages();
  
  const newMessage = {
    id: Date.now().toString(),
    nom,
    email,
    message,
    date: new Date().toISOString(),
    lu: false
  };

  messages.unshift(newMessage); // Ajouter au début

  if (saveMessages(messages)) {
    res.json({
      success: true,
      message: 'Message envoyé avec succès!',
      data: newMessage
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement du message'
    });
  }
});

// GET - Récupérer tous les messages
router.get('/', (req, res) => {
  const messages = loadMessages();
  
  res.json({
    success: true,
    data: messages
  });
});

// PUT - Marquer un message comme lu/non lu
router.put('/:id/read', (req, res) => {
  const messageId = req.params.id;
  const { lu } = req.body;

  const messages = loadMessages();
  const messageIndex = messages.findIndex(msg => msg.id === messageId);

  if (messageIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Message non trouvé'
    });
  }

  messages[messageIndex].lu = lu;

  if (saveMessages(messages)) {
    res.json({
      success: true,
      message: `Message marqué comme ${lu ? 'lu' : 'non lu'}`,
      data: messages[messageIndex]
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    });
  }
});

// DELETE - Supprimer un message
router.delete('/:id', (req, res) => {
  const messageId = req.params.id;

  const messages = loadMessages();
  const filteredMessages = messages.filter(msg => msg.id !== messageId);

  if (filteredMessages.length === messages.length) {
    return res.status(404).json({
      success: false,
      message: 'Message non trouvé'
    });
  }

  if (saveMessages(filteredMessages)) {
    res.json({
      success: true,
      message: 'Message supprimé avec succès'
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
});

// GET - Statistiques des messages
router.get('/stats', (req, res) => {
  const messages = loadMessages();
  
  const total = messages.length;
  const nonLus = messages.filter(msg => !msg.lu).length;
  const lus = messages.filter(msg => msg.lu).length;

  res.json({
    success: true,
    data: {
      total,
      nonLus,
      lus
    }
  });
});

module.exports = router;