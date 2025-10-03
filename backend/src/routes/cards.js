




// const express = require("express");
// const router = express.Router();
// const Card = require("../models/Card"); // Ton modèle existant

// // ======================
// // GET : toutes les cards
// // ======================
// router.get("/", async (req, res) => {
//   try {
//     const cards = await Card.find();
//     res.json(cards);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de la récupération des cards" });
//   }
// });

// // ======================
// // POST : ajouter une nouvelle card
// // ======================
// router.post("/", async (req, res) => {
//   try {
//     const { title, description, type, images } = req.body;

//     if (!title || !type) {
//       return res.status(400).json({ error: "Le titre et le type sont obligatoires" });
//     }

//     const newCard = new Card({
//       title,
//       description: description || "",
//       type,
//       images: images || [],
//     });

//     const savedCard = await newCard.save();
//     res.status(201).json(savedCard);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de la création de la card" });
//   }
// });

// // ======================
// // PUT : mise à jour en masse (bulk update)
// // ======================
// router.put("/bulk/update", async (req, res) => {
//   try {
//     const { cards } = req.body;

//     if (!cards || !Array.isArray(cards)) {
//       return res.status(400).json({ error: "Format invalide, 'cards' doit être un tableau" });
//     }

//     const updatePromises = cards.map(async (card) => {
//       if (card._id) {
//         // Mise à jour si _id existe
//         return await Card.findByIdAndUpdate(
//           card._id,
//           {
//             title: card.title || "",
//             description: card.description || "",
//             type: card.type || "fonctionnalité",
//             images: card.images || [],
//           },
//           { new: true, runValidators: true }
//         );
//       } else {
//         // Création si pas d'_id
//         const newCard = new Card({
//           title: card.title || "",
//           description: card.description || "",
//           type: card.type || "fonctionnalité",
//           images: card.images || [],
//         });
//         return await newCard.save();
//       }
//     });

//     const updatedCards = await Promise.all(updatePromises);
//     res.json({ message: "✅ Cards mises à jour avec succès", updatedCards });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de la mise à jour des cards" });
//   }
// });

// // ======================
// // DELETE : supprimer une card
// // ======================
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedCard = await Card.findByIdAndDelete(req.params.id);
//     if (!deletedCard) return res.status(404).json({ error: "Card non trouvée" });
//     res.json({ message: "✅ Card supprimée avec succès" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de la suppression de la card" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Card = require("../models/Card"); // Ton modèle existant

// ======================
// GET : toutes les cards ou filtrées par type
// Exemple : GET /api/cards?type=fonctionnalité
// ======================
router.get("/", async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {}; // si type fourni, on filtre sinon toutes les cartes
    const cards = await Card.find(query).sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des cards" });
  }
});

// ======================
// POST : ajouter une nouvelle card
// ======================
router.post("/", async (req, res) => {
  try {
    const { title, description, type, images } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Le titre et le type sont obligatoires" });
    }

    const newCard = new Card({
      title,
      description: description || "",
      type,
      images: images || [],
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de la card" });
  }
});

// ======================
// PUT : mise à jour en masse (bulk update)
// ======================
router.put("/bulk/update", async (req, res) => {
  try {
    const { cards } = req.body;

    if (!cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: "Format invalide, 'cards' doit être un tableau" });
    }

    const updatePromises = cards.map(async (card) => {
      if (card._id) {
        return await Card.findByIdAndUpdate(
          card._id,
          {
            title: card.title || "",
            description: card.description || "",
            type: card.type || "fonctionnalité",
            images: card.images || [],
          },
          { new: true, runValidators: true }
        );
      } else {
        const newCard = new Card({
          title: card.title || "",
          description: card.description || "",
          type: card.type || "fonctionnalité",
          images: card.images || [],
        });
        return await newCard.save();
      }
    });

    const updatedCards = await Promise.all(updatePromises);
    res.json({ message: "✅ Cards mises à jour avec succès", updatedCards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour des cards" });
  }
});

// ======================
// DELETE : supprimer une card
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) return res.status(404).json({ error: "Card non trouvée" });
    res.json({ message: "✅ Card supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression de la card" });
  }
});

module.exports = router;

