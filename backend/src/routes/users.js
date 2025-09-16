// const express = require('express');
// const router = express.Router();
// const User = require('../models/User')
// const bcrypt = require('bcryptjs');

// // 👉 Inscription
// router.post('/register', async (req, res) => {
//   try {
//     const { matricule, nom, prenom, password } = req.body;

//     // Vérification basique
//     if (!matricule || !nom || !prenom || !password) {
//       return res.status(400).json({ error: 'Tous les champs sont requis' });
//     }

//     // Vérifier si déjà existant
//     const exists = await User.findOne({ matricule });
//     if (exists) return res.status(400).json({ error: 'Matricule déjà utilisé' });

//     // Création
//     const user = new User({ matricule, nom, prenom, password });
//     await user.save();

//     res.status(201).json({ message: 'Utilisateur créé avec succès', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 👉 Connexion
// router.post('/login', async (req, res) => {
//   try {
//     const { matricule, password } = req.body;
//     if (!matricule || !password) {
//       return res.status(400).json({ error: 'Matricule et mot de passe requis' });
//     }

//     const user = await User.findUser(matricule, password); // méthode statique
//     res.json({ message: 'Connexion réussie', user });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 👉 Liste de tous les utilisateurs
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().select('-password'); // on cache le mdp
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 👉 Obtenir un utilisateur par id
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');
//     if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 👉 Mettre à jour un utilisateur
// router.put('/:id', async (req, res) => {
//   try {
//     const updates = req.body;

//     if (updates.password) {
//       // hash si password modifié
//       const bcrypt = require('bcryptjs');
//       updates.password = await bcrypt.hash(updates.password, 8);
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
//     if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

//     res.json({ message: 'Utilisateur mis à jour', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 👉 Supprimer un utilisateur
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

//     res.json({ message: 'Utilisateur supprimé' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');

// 👉 Inscription
router.post('/register', async (req, res) => {
  try {
    const { matricule, nom, prenom, password } = req.body;

    // Vérification basique
    if (!matricule || !nom || !prenom || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérifier si déjà existant
    const exists = await User.findOne({ matricule });
    if (exists) return res.status(400).json({ error: 'Matricule déjà utilisé' });

    // Création
    const user = new User({ matricule, nom, prenom, password });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Connexion
router.post('/login', async (req, res) => {
  try {
    const { matricule, password } = req.body;
    if (!matricule || !password) {
      return res.status(400).json({ error: 'Matricule et mot de passe requis' });
    }

    const user = await User.findUser(matricule, password); // méthode statique
    res.json({ message: 'Connexion réussie', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 Liste de tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // on cache le mdp
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Obtenir un utilisateur par id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      // hash si password modifié
      const bcrypt = require('bcryptjs');
      updates.password = await bcrypt.hash(updates.password, 8);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.json({ message: 'Utilisateur mis à jour', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
