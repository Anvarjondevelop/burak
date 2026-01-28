//controllerlar doim Object orqali hosil qilinadi
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
const memberService = new MemberService();
//---------------------------------------------------------------------
const restaurantController: T = {};
//---------------------------------------------------------------------
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    //Logic
    //Service Model
    res.render("home");
    //send | json | redirect | end | render
  } catch (err) {
    console.log("Error, go Home :", err);
  }
};
//---------------------------------------------------------------------
restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    console.log("getSignUp");
    res.render("signup");
  } catch (err) {
    console.log("Error, Signup page :", err);
  }
};

//---------------------------------------------------------------------
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, login:", err);
  }
};
//---------------------------------------------------------------------
restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processSignup");
    console.log("body::", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);
    // TODO: SESSIONS AUTHENTICATION
    //Sessionlarimiz muvaffaqiyatli saqlangach ya'ni bizni brausermizdagi cookie ni ichiga sid ni joylaydi hamda biz collectionimizga  session hujjati saqlanadi
    req.session.member = result; //mavjud muhrga ma’lumot bog‘lanayapti,  Mana shu muhr egasi — result (ya’ni shu user)
    req.session.save(function () {
      //“session ni MongoDB ga yozib bo‘lmaguncha clientga response yuborma”
      res.send(result);
    });
  } catch (err) {
    console.log("Error,  processSignUp :", err);
    res.send(err);
  }
};

//---------------------------------------------------------------------
restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processLogin");
    console.log("body::", req.body);
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);
    // TODO: SESSIONS AUTHENTICATION
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });

    res.send(result);
  } catch (err) {
    console.log("Error,  processLogin :", err);
    res.send(err);
  }
};

export default restaurantController;

//get - shunchaki brouser orqali qaysidir page ga kirimiz uchun ximzat qilsa
// post - biror bir harakatlarni amalga oshirmoqchi bo'lgan paytda ishlatamiz

//biz lohihamizda minimalistic uslubda : query hamnda mutation
