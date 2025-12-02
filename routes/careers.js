const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

// GET all careers
router.get("/", async (req, res) => {
    try {
        const careers = await Career.find();
        res.json(careers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific career by ID (custom ID or MongoDB _id)
router.get("/:id", async (req, res) => {
    try {
        // Try finding by custom ID first, then by _id if valid
        let career = await Career.findOne({ id: req.params.id });
        if (!career && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            career = await Career.findById(req.params.id);
        }

        if (!career) return res.status(404).json({ message: "Job not found" });
        res.json(career);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new career
router.post("/", async (req, res) => {
    const career = new Career(req.body);
    try {
        const newCareer = await career.save();
        res.status(201).json(newCareer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) a career
router.put("/:id", async (req, res) => {
    try {
        let query = { id: req.params.id };
        if (!await Career.findOne(query) && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: req.params.id };
        }

        const updatedCareer = await Career.findOneAndUpdate(query, req.body, { new: true });
        if (!updatedCareer) return res.status(404).json({ message: "Job not found" });
        res.json(updatedCareer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a career
router.delete("/:id", async (req, res) => {
    try {
        let query = { id: req.params.id };
        if (!await Career.findOne(query) && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: req.params.id };
        }

        const deletedCareer = await Career.findOneAndDelete(query);
        if (!deletedCareer) return res.status(404).json({ message: "Job not found" });
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
