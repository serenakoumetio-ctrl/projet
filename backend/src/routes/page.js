const express = require("express");
const router = express.Router();
const Page = require("../models/Page");
//const { verifyToken, isAdmin } = require("../middlewares/auth");

// GET toutes les pages (public)
router.get("/", async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une page par slug (public)
router.get("/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: "Page introuvable" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une page (admin)
router.post("/",  async (req, res) => {
  try {
    const { slug, title, description, content } = req.body;
    const page = await Page.create({ slug, title, description, content });
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT modifier une page (admin)
router.put("/:slug",  async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { title, description, content, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE une page (admin)
router.delete("/:slug",  async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: "Page introuvable" });
    res.json({ message: "Page supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
