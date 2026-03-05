import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { Request, Response } from "express";

import ProductService from "../models/Product.service";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductInput, ProductInquiry } from "../libs/types/product";

const productService = new ProductService();

const productController: T = {};
/* SPA */

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");

    const { page, limit, order, productCollection, search } = req.query;
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };

    if (search) inquiry.search = String(search);

    const result = await productService.getProducts(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error,  getProducts :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
// const query = req.query;
// console.log(" req query", query);
// const params = req.params;
// console.log("req params:", params);

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const { id } = req.params; // destructuring | req.params ichidan id degan property ni olib, id degan o‘zgaruvchiga saqla
    const memberId = req.member._id ?? null;

    const result = await productService.getProduct(memberId, id as string);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error,  getProduct :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

/* SSR */

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();
    console.log(data);
    res.render("products", { products: data });
  } catch (err) {
    console.log("Error,  signup :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);

    // res.json({})`
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    console.log("req.files:", req.files);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path;
    });

    await productService.createNewProduct(data);

    // console.log("data:", data);
    res.send(
      `<script>
     alert("Successful creation!");
     window.location.replace('/admin/product/all');
   </script>`
    );
  } catch (err) {
    console.log("Error,  createNewProduct :", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>
     alert("${message}");
     window.location.replace('/admin/product/all');
   </script>`
    );
    // res.json({})`
  }
};
productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id as string;

    const result = await productService.updateChosenProduct(id, req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error,  updateChosenProduct :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);

    // res.json({})`
  }
};

export default productController;
