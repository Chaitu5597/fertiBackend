const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/products", require("./routes/products.js"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully!"))
  .catch(err => console.log("Connection Error:", err));

app.get("/", (req, res) => {
  res.send("<h1>FertiBase Backend Running Securely</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});