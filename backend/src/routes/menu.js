const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
//const { verifyToken, isAdmin } = require("../middlewares/auth");

// GET tous les items de menu (public)
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find().sort({ order: 1 });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un item de menu par ID (public)
router.get("/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item de menu non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST un nouvel item (admin)
router.post("/",  async (req, res) => {
  try {
    const { title, url, order, submenu } = req.body;
    const item = await Menu.create({ title, url, order, submenu });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT modifier un item (admin)
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body; // title, url, order, submenu
    const item = await Menu.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE un item (admin)
router.delete("/:id",  async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item de menu non trouvé" });
    res.json({ message: "Item de menu supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
