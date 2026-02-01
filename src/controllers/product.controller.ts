import { T } from "../libs/types/common";
import Errors from "../libs/types/Errors";
import { Request, Response } from "express";

import ProductService from "../models/Product.service";

const productService = new ProductService();

const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("products");
  } catch (err) {
    console.log("Error,  signup :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    //! nimaga bu yerda code bilan chaqirildi?
    // res.json({})`
  }
};

productController.createNewProduct = async (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");
  } catch (err) {
    console.log("Error,  createNewProduct :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    //! nimaga bu yerda code bilan chaqirildi?
    // res.json({})`
  }
};
productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
  } catch (err) {
    console.log("Error,  updateChosenProduct :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    //! nimaga bu yerda code bilan chaqirildi?
    // res.json({})`
  }
};

export default productController;
