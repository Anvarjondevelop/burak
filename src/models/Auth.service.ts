import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";

import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretToken;
  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string;
  }
  public createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`; //Token amal qilish vaqtini belgilayapti.
      jwt.sign(
        //Bu funksiya JWT token yaratadi.
        // jwt.sign() aslida callback bilan ishlaydi biz esa uni async/await bilan ishlatish uchun Promise ichiga o‘rab qo‘yyapmiz.
        payload, //Token ichiga joylanadigan ma’lumot.
        process.env.SECRET_TOKEN as string, //Tokenni imzolash uchun maxfiy kalit
        { expiresIn: duration }, //Token qachongacha amal qilishini belgilaydi.
        (err, token) => {
          //jwt.sign ishlagach shu funksiya chaqiriladi.
          //token → yaratilgan JWT
          if (err)
            reject(
              //reject → xatolik bo‘lsa xato qaytaradi
              new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
            );
          else resolve(token as string); //resolve → token muvaffaqiyatli yaratilsa qaytaradi
          console.log("token=> :", token);
        }
      );
    });
  }
  //Tookendan Objectga aylantirib beradi
  public async checkAuth(token: string): Promise<Member> {
    const result: Member = (await jwt.verify(
      token,
      this.secretToken
    )) as Member;
    console.log(`----[AUTH] memberNick: ${result.memberNick}`);
    return result;
  }
}

export default AuthService;
