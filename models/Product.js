const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: "Active" },
  price: String,
  stock: { type: String, default: "In Stock" },
  metaTitle: String,
  metaKeywords: String,
  overview: String,
  whatIs: String,
  howItWorks: String,
  whyChoose: String,
  benefits: [{ title: String, desc: String }],
  dosage: [{ method: String, dosage: String, timing: String, details: String }],
  crops: [String],
  techInfo: [{ key: String, value: String }],
  packSizes: [String],
  faqs: [{ question: String, answer: String }],
  image: { type: String, default: "" },
  video: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);