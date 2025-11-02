
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const Image = require('../models/Picture');

// // Créer le dossier public/images s'il n'existe pas
// const uploadDir = path.join(__dirname, '../public/images');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // Multer pour stocker les fichiers dans public/images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// // ======================
// // GET -> récupérer toutes les images
// // ======================
// router.get('/', async (req, res) => {
//   try {
//     const images = await Image.find().sort({ createdAt: -1 });
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ======================
// // POST -> ajouter une nouvelle image
// // ======================
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'Aucun fichier téléchargé' });

//     const { title, description } = req.body;
//     const image = await Image.create({
//       title,
//       description,
//       url: `/images/${req.file.filename}`, // chemin public
//       uploader: "Admin" // ou récupérer depuis req.user si authentification
//     });

//     res.status(201).json(image);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ======================
// // PUT -> modifier une image
// // ======================
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const updates = {
//       title: req.body.title,
//       description: req.body.description
//     };

//     if (req.file) updates.url = `/images/${req.file.filename}`;

//     const image = await Image.findByIdAndUpdate(req.params.id, updates, { new: true });
//     if (!image) return res.status(404).json({ error: 'Image non trouvée' });

//     res.json(image);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ======================
// // DELETE -> supprimer une image
// // ======================
// router.delete('/:id', async (req, res) => {
//   try {
//     const image = await Image.findByIdAndDelete(req.params.id);
//     if (!image) return res.status(404).json({ error: 'Image non trouvée' });

//     // Supprimer le fichier du serveur
//     if (image.url) {
//       const filePath = path.join(__dirname, '../public', image.url);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     }

//     res.json({ message: 'Image supprimée' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

const defaultImages = [
  '/default/background-1.jpg',
  '/default/background-2.jpg',
  '/default/background-3.jpg'
];

// Upload d'image
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Aucune image sélectionnée' 
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'Image téléchargée avec succès!',
      imageUrl: imageUrl
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors du téléchargement' 
    });
  }
});

// Images par défaut
router.get('/default-images', (req, res) => {
  res.json({
    success: true,
    images: defaultImages
  });
});

// Images uploadées
router.get('/uploaded-images', (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '../public/uploads');
    let uploadedImages = [];
    
    if (fs.existsSync(uploadDir)) {
      const files = fs.readdirSync(uploadDir);
      uploadedImages = files
        .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
        .map(file => `/uploads/${file}`);
    }
    
    res.json({
      success: true,
      images: uploadedImages
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lecture images' 
    });
  }
});

module.exports = router;