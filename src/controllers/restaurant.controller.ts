//controllerlar doim Object orqali hosil qilinadi
import { Request, Response } from "express";
import { T } from "../libs/types/common";
//---------------------------------------------------------------------
const restaurantController: T = {};
//---------------------------------------------------------------------
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send(" Home Page");
  } catch (err) {
    console.log("Error, go Home :", err);
  }
};
//---------------------------------------------------------------------
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.send(" Login Page");
  } catch (err) {
    console.log("Error, login:", err);
  }
};
//---------------------------------------------------------------------
restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    res.send(" Sign up Page");
  } catch (err) {
    console.log("Error, Signup page :", err);
  }
};
//---------------------------------------------------------------------

export default restaurantController;
