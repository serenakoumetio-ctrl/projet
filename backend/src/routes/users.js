const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

// Charger les utilisateurs
const loadUsers = () => {
  try {
    if (fs.existsSync(usersFile)) {
      return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    }
  } catch (error) {
    console.error('Erreur lecture utilisateurs:', error);
  }
  
  return [];
};

// Sauvegarder les utilisateurs
const saveUsers = (users) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(usersFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur sauvegarde utilisateurs:', error);
    return false;
  }
};

// Inscription
router.post('/register', async (req, res) => {
  const { matricule, nom, prenom, password } = req.body;

  // Validation
  if (!matricule || !nom || !prenom || !password) {
    return res.status(400).json({
      success: false,
      error: 'Tous les champs sont requis'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Le mot de passe doit contenir au moins 6 caractères'
    });
  }

  const users = loadUsers();

  // Vérifier si l'utilisateur existe déjà
  const userExists = users.find(user => user.matricule === matricule);
  if (userExists) {
    return res.status(400).json({
      success: false,
      error: 'Un utilisateur avec ce matricule existe déjà'
    });
  }

  try {
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      matricule,
      nom,
      prenom,
      password: hashedPassword,
      role: 'admin', // Par défaut, tous les utilisateurs sont admin
      dateCreation: new Date().toISOString()
    };

    users.push(newUser);

    if (saveUsers(users)) {
      // Retourner l'utilisateur sans le mot de passe
      const { password: _, ...userWithoutPassword } = newUser;
      
      res.json({
        success: true,
        message: 'Utilisateur créé avec succès',
        user: userWithoutPassword
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la création de l\'utilisateur'
      });
    }
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { matricule, password } = req.body;

  if (!matricule || !password) {
    return res.status(400).json({
      success: false,
      error: 'Matricule et mot de passe requis'
    });
  }

  const users = loadUsers();
  const user = users.find(u => u.matricule === matricule);

  if (!user) {
    return res.status(400).json({
      success: false,
      error: 'Matricule ou mot de passe incorrect'
    });
  }

  try {
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Matricule ou mot de passe incorrect'
      });
    }

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Vérifier l'authentification (middleware)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Token d\'authentification requis'
    });
  }

  // Pour simplifier, on vérifie juste que l'utilisateur existe
  // Dans une vraie app, on utiliserait JWT
  const userData = JSON.parse(Buffer.from(authHeader.slice(7), 'base64').toString());
  const users = loadUsers();
  const user = users.find(u => u.id === userData.id);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Utilisateur non authentifié'
    });
  }

  req.user = user;
  next();
};

// Route protégée pour vérifier l'authentification
router.get('/me', authenticate, (req, res) => {
  const { password: _, ...userWithoutPassword } = req.user;
  res.json({
    success: true,
    user: userWithoutPassword
  });
});

module.exports = router;