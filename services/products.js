const productsMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsServices {
  constructor() {
    this.collection = "products";
    this.mongoDB = new MongoLib();
  }
  async getProducts({ tags }) {
    console.log("JMMS_this.collection", this.collection);
    const query = tags && { tags: { $in: tags } }; //&& funciona para preguntar si una variable existe
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }
  async getProduct({ productId }) {
    const product = await this.mongoDB.getAll(this.collection, productId);
    return product || [];
  }
  createProduct({ product }) {
    return Promise.resolve(productsMocks[productId]);
  }
  updateProduct({ product, productId }) {
    return Promise.resolve(productsMocks[productId]);
  }
  deleteProduct({ productId }) {
    return Promise.resolve(productsMocks[productId]);
  }
}
module.exports = ProductsServices;
