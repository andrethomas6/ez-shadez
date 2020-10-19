const mongoose = require("mongoose");
const shortid = require("shortid");

mongoose.connect("mongodb://localhost:27017/ez-shadez", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  title: String,
  description: String,
  images: String,
  price: Number,
  type: [String],
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
