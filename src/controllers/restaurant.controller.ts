//controllerlar doim Object orqali hosil qilinadi
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
//---------------------------------------------------------------------
const restaurantController: T = {};
//---------------------------------------------------------------------
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    //Logic
    //Service Model
    res.send("PAge");
  } catch (err) {
    console.log("Error, go Home :", err);
  }
};
//---------------------------------------------------------------------
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send(" Login Page");
  } catch (err) {
    console.log("Error, login:", err);
  }
};
//---------------------------------------------------------------------
restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    console.log("getSignUp");
    res.send(" Sign up Page");
  } catch (err) {
    console.log("Error, Signup page :", err);
  }
};
//---------------------------------------------------------------------

export default restaurantController;
