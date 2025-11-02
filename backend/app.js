// require('dotenv').config();

// const express = require('express');
// const cors = require('cors'); // <-- import cors

// // Import des fonctions pour MongoDB
// const { connectDb } = require('./src/service/mongoose'); 


// // Import des routes
// const configurationRoutes = require('./src/routes/configuration');
// const cardRoutes = require('./src/routes/Cards');
// const menuRoutes = require('./src/routes/menu');
// const pageRoutes = require('./src/routes/page');
// const sectionRoutes = require('./src/routes/section');
// const messageRoutes = require('./src/routes/messages');
// const imageRoutes = require('./src/routes/images');
// const usersRoutes = require('./src/routes/users')

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware global
// app.use(express.json());
// app.use(cors()); // <-- autorise toutes les requêtes cross-origin

// // ======================
// // Définition des routes API
// // ======================
// app.use('/api/configuration', configurationRoutes);
// app.use('/api/cards', cardRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/pages', pageRoutes);
// app.use('/api/sections', sectionRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/images', imageRoutes);
// app.use('/api/users', usersRoutes);
// // Route test
// app.get('/', (req, res) => {
//   res.send('API du site est en ligne ✅');
// });

// // ======================
// // Connexion à MongoDB et lancement du serveur
// // ======================
// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Le serveur est lancé à: http://localhost:${port} 🚀`);
//     });
//   })
//   .catch(err => console.log('Erreur lors de la connexion à la DB:', err));


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// // Import des fonctions pour MongoDB
// const { connectDb } = require('./src/service/mongoose');

// // Import des routes
// const configurationRoutes = require('./src/routes/configuration');
// const cardRoutes = require('./src/routes/cards');
// const menuRoutes = require('./src/routes/menu');
// const pageRoutes = require('./src/routes/page');
// const sectionRoutes = require('./src/routes/section');
// const messageRoutes = require('./src/routes/messages');
// const imageRoutes = require('./src/routes/images');
// const usersRoutes = require('./src/routes/users');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware global
// app.use(express.json());
// app.use(cors());

// // Base de données simple (en mémoire pour commencer)
// let contentData = {
//   accueil: {
//     title: "Gov-AI : Révolutionner l'accès aux textes de loi du Cameroun",
//     subtitle: "Une intelligence artificielle dédiée aux fonctionnaires pour une administration plus transparente, rapide et fiable.",
//     buttonText: "En savoir plus",
//     backgroundImage: "/img/STAND.png"
//   },
//   apropos: {
//     title: "C'est quoi GOV-IA ? / What's GOV-AI ?",
//     description: "GOV-AI est une plateforme technologique de pointe conçue pour révolutionner l'accès aux textes juridiques et administratifs au Cameroun. Pensée pour les fonctionnaires, les juristes, les magistrats mais aussi pour les citoyens, elle propose une nouvelle manière de consulter, comprendre et utiliser les lois en vigueur. Grâce à son intelligence artificielle, GOV-AI analyse les besoins en temps réel, suggère des contenus pertinents, et facilite la prise de décision administrative dans un cadre sécurisé, rapide et intuitif. Son objectif : rapprocher le droit du citoyen et rendre l'administration plus efficace.",
//     cards: [
//       {
//         title: "Mission & Vision",
//         content: "Gov‑AI modernise l'accès aux textes de loi grâce à l'IA pour une administration plus transparente."
//       },
//       {
//         title: "Ce que nous offrons",
//         content: "Moteur de recherche juridique, alertes personnalisées, analyse automatisée, interface intuitive."
//       },
//       {
//         title: "Notre approche", 
//         content: "Une technologie éthique, locale et pensée pour les administrations camerounaises."
//       },
//       {
//         title: "Accessibilité",
//         content: "Une solution multilingue disponible sur tous les supports (web, mobile, desktop)."
//       },
//       {
//         title: "Sécurité",
//         content: "Des données encryptées et hébergées localement pour garantir la souveraineté numérique."
//       },
//       {
//         title: "Pourquoi GOV-AI ?",
//         content: "Parce que l'accès aux textes juridiques doit être simple, rapide et intelligent. GOV-AI permet aux agents publics de trouver en quelques secondes les textes pertinents, évitant des heures de recherche manuelle."
//       },
//       {
//         title: "Pour qui est GOV-AI ?",
//         content: "GOV-AI s'adresse aux juristes, aux administrations, aux magistrats, mais aussi aux citoyens souhaitant mieux comprendre leurs droits et les lois en vigueur."
//       },
//       {
//         title: "Un assistant juridique intelligent",
//         content: "Basé sur l'intelligence artificielle, GOV-AI comprend vos requêtes en langage naturel, suggère des articles de loi pertinents, et apprend continuellement pour améliorer ses réponses."
//       }
//     ],
//     conclusion: {
//       title: "Voici ce qu'est GOV-AI 🌐",
//       points: [
//         "Assistant juridique intelligent qui révolutionne l'accès aux lois et réglementations.",
//         "Accessibilité multilingue adaptée aux besoins des administrations camerounaises.",
//         "Garantit la sécurité et la souveraineté numérique avec un hébergement local des données.",
//         "Accélère la prise de décision administrative grâce à des suggestions précises et rapides.",
//         "Une solution pensée pour tous : agents publics, juristes, magistrats et citoyens."
//       ]
//     }
//   }
// };



// //1 section acc

// // Route pour récupérer le contenu
// app.get('/api/content/:section', (req, res) => {
//   const section = req.params.section;
//   res.json(contentData[section] || {});
// });

// // Route pour modifier le contenu
// app.put('/api/content/:section', (req, res) => {
//   const section = req.params.section;
//   contentData[section] = req.body;
//   res.json({ message: 'Contenu mis à jour', data: contentData[section] });
// });

// //2section propos

// // ======================
// // Servir les images depuis le dossier public/images
// // ======================
// app.use('/images', express.static(path.join(__dirname, 'src/public/images')));

// // ======================
// // Définition des routes API
// // ======================
// app.use('/api/configuration', configurationRoutes);
// app.use('/api/cards', cardRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/pages', pageRoutes);
// app.use('/api/sections', sectionRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/images', imageRoutes);
// app.use('/api/users', usersRoutes);

// // Route test
// app.get('/', (req, res) => {
//   res.send('API du site est en ligne ✅');
// });

// // ======================
// // Connexion à MongoDB et lancement du serveur
// // ======================
// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Le serveur est lancé à: http://localhost:${port} 🚀`);
//     });
//   })
//   .catch(err => console.log('Erreur lors de la connexion à la DB:', err));



const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
// Serve static files from the src/public directory
app.use('/uploads', express.static(path.join(__dirname, 'src/public/uploads')));
app.use('/default', express.static(path.join(__dirname, 'src/public/default')));

// Routes (point to files in src/routes)
app.use('/api/content', require('./src/routes/content'));
app.use('/api/upload', require('./src/routes/upload'));
app.use('/api/messages', require('./src/routes/messages'));
app.use('/api/users', require('./src/routes/users'));

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend fonctionne!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📁 Dossier uploads: ${path.join(__dirname, 'src/public/uploads')}`);
});