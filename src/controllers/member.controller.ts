//controllerlar doim Object orqali hosil qilinadi
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
import { lightGreen } from "@mui/material/colors";
const memberService = new MemberService();
const authService = new AuthService();
//==============================================================================
const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    console.log("body::", req.body);
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input),
      token = await authService.createToken(result);
    // TODO: TOKENS AUTHENTICATION

    console.log("result:", result);
    console.log("token==", token);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    // console.log("token==", token);
    res.status(HttpCode.CREATED).json({ member: result, accessToken: token }); // frontendga JSON response qilib yuborish

    //member — bu shunchaki JSON ichidagi nom (key),
    //ma’lumotni o‘rab turuvchi konteyner.
  } catch (err) {
    console.log("Error,  signup :", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    //! nimaga bu yerda code bilan chaqirildi?
    // res.json({})
  }
};
//==============================================================================
memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    console.log("body::", req.body);
    const input: LoginInput = req.body;
    const result = await memberService.login(input);
    console.log("result", result);
    // TODO: TOKENS AUTHENTICATION

    const token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      // 1 .cookie nomi (key),2. cookie ichiga joylanadigan qiymat (value). 3 .cookie qancha vaqt saqlanishini belgilaydi.
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false, // true bo'lsa Frontend (JS) cookie’ni o‘qiy olmaydi
    });

    // console.log("token==", token);
    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Error,  login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
//==============================================================================

memberController.verifyAuth = async (req: Request, res: Response) => {
  try {
    let member = null;
    const token = req.cookies["accessToken"];
    if (token) member = await authService.checkAuth(token);

    if (!member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHTHENTICATED);

    console.log("member", member);
    res.status(HttpCode.OK).json({ member: member });
  } catch (err) {
    console.log("Error,  verifyAuth:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default memberController;
