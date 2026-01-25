//controllerlar doim Object orqali hosil qilinadi
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
//---------------------------------------------------------------------
const restaurantController: T = {};
//---------------------------------------------------------------------
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    //Logic
    //Service Model
    res.send("Home Page");
    //send | json | redirect | end | render
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
restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body::", req.body);
    const input: LoginInput = req.body;

    const memberService = new MemberService();
    const result = await memberService.processLogin(input);

    res.send(result);
  } catch (err) {
    console.log("Error,  processLogin :", err);
    res.send(err);
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body::", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("Error,  processSignUp :", err);
    res.send(err);
  }
};
export default restaurantController;

//get - shunchaki brouser orqali qaysidir page ga kirimiz uchun ximzat qilsa
// post - biror bir harakatlarni amalga oshirmoqchi bo'lgan paytda ishlatamiz

//biz lohihamizda minimalistic uslubda : query hamnda mutation
