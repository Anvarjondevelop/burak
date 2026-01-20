//modellar doim Class lar orqali quriladi
//service model to'gridan-to'g'ri controller bilan ishlaydi
//database bilan bog'liq harqanday operatsiyalarni Schema modeli orqali amalga oshiramiz

import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
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
}

export default MemberService;
