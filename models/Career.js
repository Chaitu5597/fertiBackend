
// models/Career.js
const mongoose = require("mongoose"); // ← Add this at the top

const careerSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    preview: String,
    desc: String,
    about: String,
    responsibilities: [String],
    requirements: [String],
    skills: [String],
    tools: [String],
    experience: String,
    salary: String,
    location: String,
    mode: String,
    type: String,
    positions: Number,
    daysLeft: Number,
    niceToHave: [String],
    applyNote: String
}, { timestamps: true });

module.exports = mongoose.model("Careers", careerSchema);
