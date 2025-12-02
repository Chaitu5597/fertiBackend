const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

// GET one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ msg: "Not found" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});    //tq

// CREATE product
router.post("/", async (req, res) => {
  try {
    const newProduct = await new Product(req.body).save();
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.json(updated) : res.status(404).json({ msg: "Not found" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;