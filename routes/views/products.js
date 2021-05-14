const express = require("express");
const ProductsServices = require("../../services/products");
const router = express.Router();
const productServices = new ProductsServices();
router.get("/", async function (req, res, next) {
  try {
    const { tags } = req.query;
    products = await productServices.getProducts({ tags });
    res.render("products", { products });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
