//controllerlar doim Object orqali hosil qilinadi
import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
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
    res.redirect("/admin");
  }
};
//---------------------------------------------------------------------
restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    console.log("getSignUp");
    res.render("signup");
  } catch (err) {
    console.log("Error, Signup page :", err);
    res.redirect("/admin");
  }
};

//---------------------------------------------------------------------
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, login:", err);
    res.redirect("/admin");
  }
};
//---------------------------------------------------------------------
restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processSignup");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    // console.log("body::", req.body);
    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);
    // TODO: SESSIONS AUTHENTICATION
    //Sessionlarimiz muvaffaqiyatli saqlangach ya'ni bizni brausermizdagi cookie ni ichiga sid ni joylaydi hamda biz collectionimizga  session hujjati saqlanadi
    req.session.member = result; //mavjud muhrga ma’lumot bog‘lanayapti,  Mana shu muhr egasi — result (ya’ni shu user)
    req.session.save(function () {
      //“session ni MongoDB ga yozib bo‘lmaguncha clientga response yuborma”
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error,  processSignUp :", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/signup')</script>`
    );
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
    console.log("req session::", req.session);
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);
    // TODO: SESSIONS AUTHENTICATION
    req.session.member = result;
    req.session.save(function () {});

    res.redirect("/admin/product/all");
  } catch (err) {
    console.log("Error,  processLogin :", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/login')</script>`
    );
  }
};

//---------------------------------------------------------------------
restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error,  logout :", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('admin/login')</script>`
    );
    res.send(err);
  }
};
//---------------------------------------------------------------------
restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("REsult::", result);

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};
//---------------------------------------------------------------------
restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
//---------------------------------------------------------------------
restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      res.send(`<script> alert ("${req.session.member.memberNick}")</script>`);
    else res.send(`<script> alert ("${Message.NOT_AUTHTHENTICATED}")</script>`);
  } catch (err) {
    console.log("Error,  checkAuthSession :", err);
    res.send(err);
  }
};

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHTHENTICATED;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/login')</script>`
    );
  }
};

export default restaurantController;

//get - shunchaki brouser orqali qaysidir page ga kirimiz uchun ximzat qilsa
// post - biror bir harakatlarni amalga oshirmoqchi bo'lgan paytda ishlatamiz

//biz lohihamizda minimalistic uslubda : query hamnda mutation
