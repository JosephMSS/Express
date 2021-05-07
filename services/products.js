const productsMocks = require("../utils/mocks/products");
class ProductsServices {
  constructor() {}
  getProducts({ tags }) {
    return Promise.resolve(productsMocks);
  }
  getProduct({ productId }) {
    return Promise.resolve(productsMocks[productId]);
  }
  createProduct({ product }) {
    return Promise.resolve(productsMocks[productId]);
  }
  updateProduct({ product,productId }) {
    return Promise.resolve(productsMocks[productId]);
  }
  deleteProduct({ productId }) {
    return Promise.resolve(productsMocks[productId]);
  }
}
module.exports=ProductsServices
