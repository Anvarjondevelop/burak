//controllerlar doim Object orqali hosil qilinadi
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode } from "../libs/types/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
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
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    // console.log("token==", token);
    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Error,  login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default memberController;
