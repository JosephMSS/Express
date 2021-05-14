const express = require("express");
const router = express.Router();
const ProductsServices = require("../../services/products");

const productsServices = new ProductsServices();

router.get("/", list);
router.get("/:productId", get);
router.post("/", insert);
router.put("/:productId", update);
router.delete("/:productId", remove);

async function list(req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productsServices.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (error) {
    next(error)
  }
}
async function get(req, res) {
  const { productId } = req.params;
  try {
    const products = await productsServices.getProduct({ productId });
    res.status(200).json({
      data: products,
      message: "products retrived",
    });
  } catch (error) {
    next(error)
  }
}
async function insert(req, res, next) {
  const { body:product } = req; //de esta manera creamos un alias
  try {
    const response = await productsServices.createProduct({ product });
    res.status(201).json({
      data: response,
      message: "products created",
    });
  } catch (error) {
    next(error)
  }
}
async function update(req, res) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const response = await productsServices.updateProduct({
      product,
      productId,
    });
    res.status(200).json({
      data: response,
      message: "products updated",
    });
  } catch (error) {
    next(error)
  }
}
function remove(req, res) {
  const { productId } = req.params;
  try {
    const response = productsServices.deleteProduct({productId});
    res.status(200).json({
      data: response,
      message: "product deleted",
    });
  } catch (error) {
    next(error)
  }
}

module.exports = router;
