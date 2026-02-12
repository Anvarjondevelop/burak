//modellar doim Class lar orqali quriladi
//service model to'gridan-to'g'ri controller bilan ishlaydi
//database bilan bog'liq harqanday operatsiyalarni Schema modeli orqali amalga oshiramiz

import MemberModel from "../schema/Member.model";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs"; //bcryptjs ichidan hamma exportlarni olib, ularni bcrypt degan obyekt ichiga joyla”
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
  private readonly memberModel; //bu o‘zgaruvchi class ichidagi doimiy model.

  constructor() {
    this.memberModel = MemberModel; //Constructor — class yaratilganda avtomatik ishlaydi.
  }
  //Constructor ichida MemberModel ni class property sifatida biriktirib, service ichida database bilan ishlash uchun foydalanish imkonini yaratadi.

  /* SPA */

  public async signup(input: MemberInput): Promise<Member> {
    // console.log("before:", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    // console.log("after:", input.memberPassword);

    try {
      const result = await this.memberModel.create(input);
      console.log("RESULT", result);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      // console.error("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }
  //---------------------------------------------------------------------

  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider member status later
    //nimaga promise da Member qaytaryapdi?
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }
      ) //member schema modeli orqali DBdan ma'lumot qidiryapdi
      //password to'g'ri kiritilganmi yo'qmi bilish uchun uni majburiy chaqirib olish kerak
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    //const isMatch = input.memberPassword === member.memberPassword;

    // console.log("isMatch::", isMatch);
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).lean().exec();
    return result;
  }
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //|||||||||||||||||||||||||||||||||||| /* SSR */ ||||||||||||||||||||||||||||||||||||||||||||||||||||
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec(); //findOne dan keyin hech qanday query qo'yilmasligiga singnal; //.exec() — Mongoose query’ni aniq Promise sifatida ishga tushiradi va TypeScript’da toza ishlashni ta’minlaydi.
    // console.log("exist", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    // console.log("before:", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    // console.log("after:", input.memberPassword);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  //---------------------------------------------------------------------

  public async processLogin(input: LoginInput): Promise<Member> {
    //nimaga promise da Member qaytaryapdi?
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick }, // Filtering
        { memberNick: 1, memberPassword: 1 } // Projection
      ) //member schema modeli orqali DBdan ma'lumot qidiryapdi
      //password to'g'ri kiritilganmi yo'qmi bilish uchun uni majburiy chaqirib olish kerak
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    //const isMatch = input.memberPassword === member.memberPassword;

    // console.log("isMatch::", isMatch);
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    const result = await this.memberModel.findById(member._id).exec();

    console.log("result::", result);
    console.log("member:", member);
    return result;
  }
  //---------------------------------------------------------------------

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }
  //---------------------------------------------------------------------

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      //1-qaysi hujjatni topamiz?
      //2-nimani yangilaymiz?
      //3-yangilangan documentni qaytaradi
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default MemberService;
