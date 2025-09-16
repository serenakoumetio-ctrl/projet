const express = require("express");
const router = express.Router();
const Configuration = require("../models/Configuration");
//const { verifyToken, isAdmin } = require("../middlewares/auth");

// GET configuration (public ou admin)
router.get("/", async (req, res) => {
  try {
    let config = await Configuration.findOne();
    if (!config) {
      config = await Configuration.create({});
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT configuration (admin uniquement)
router.put("/", async (req, res) => {
  try {
    const updates = req.body; // objet avec tous les champs à modifier
    const config = await Configuration.findOneAndUpdate({}, updates, { new: true, upsert: true });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
