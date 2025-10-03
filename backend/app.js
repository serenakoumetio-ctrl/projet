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


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import des fonctions pour MongoDB
const { connectDb } = require('./src/service/mongoose');

// Import des routes
const configurationRoutes = require('./src/routes/configuration');
const cardRoutes = require('./src/routes/cards');
const menuRoutes = require('./src/routes/menu');
const pageRoutes = require('./src/routes/page');
const sectionRoutes = require('./src/routes/section');
const messageRoutes = require('./src/routes/messages');
const imageRoutes = require('./src/routes/images');
const usersRoutes = require('./src/routes/users');

const app = express();
const port = process.env.PORT || 5000;

// Middleware global
app.use(express.json());
app.use(cors());

// ======================
// Servir les images depuis le dossier public/images
// ======================
app.use('/images', express.static(path.join(__dirname, 'src/public/images')));

// ======================
// Définition des routes API
// ======================
app.use('/api/configuration', configurationRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', usersRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('API du site est en ligne ✅');
});

// ======================
// Connexion à MongoDB et lancement du serveur
// ======================
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Le serveur est lancé à: http://localhost:${port} 🚀`);
    });
  })
  .catch(err => console.log('Erreur lors de la connexion à la DB:', err));
