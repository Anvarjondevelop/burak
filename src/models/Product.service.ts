import { Product, ProductInput } from "../libs/types/product";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }
  /* SPA */

  /* SSR */
  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("error: model create data", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ProductService;
