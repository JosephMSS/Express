const productsMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsServices {
  constructor() {
    this.collection = "products";
    this.mongoDB = new MongoLib();
  }
  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } }; //&& funciona para preguntar si una variable existe
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }
  async getProduct({ productId }) {
    const product = await this.mongoDB.getAll(this.collection, productId);
    return product || [];
  }
  async createProduct({ product }) {
    try {
      const newProduct=await this.mongoDB.create(this.collection,product)
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }
  async updateProduct({ product, productId }) {
    try {
      const newProduct=await this.mongoDB.update(this.collection,productId,product)
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }
  async deleteProduct({ productId }) {
    try {
      const response=await this.mongoDB.delete(this.collection,productId)
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = ProductsServices;
