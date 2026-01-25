//modellar doim Class lar orqali quriladi
//service model to'gridan-to'g'ri controller bilan ishlaydi
//database bilan bog'liq harqanday operatsiyalarni Schema modeli orqali amalga oshiramiz

import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec(); //findOne dan keyin hech qanday query qo'yilmasligiga singnal; //.exec() — Mongoose query’ni aniq Promise sifatida ishga tushiradi va TypeScript’da toza ishlashni ta’minlaydi.
    // console.log("exist", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async processLogin(input: LoginInput): Promise<Member> {
    //nimaga promise da Member qaytaryapdi?
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      ) //member schema modeli orqali DBdan ma'lumot qidiryapdi
      //password to'g'ri kiritilganmi yo'qmi bilish uchun uni majburiy chaqirib olish kerak
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = input.memberPassword === member.memberPassword;
    console.log("isMatch::", isMatch);
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    const result = await this.memberModel.findById(member._id).exec();

    console.log("result::", result);
    console.log("member:", member);
    return result;
  }
}

export default MemberService;
