import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Session } from "react-router";
import { Request } from "express";

export interface Member {
  _id: ObjectId;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  // Fronteddan kelgan ma'lumotlar uchun qolib
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

//! Qayta ko'rib chiqish kerak
export interface AdminRequest extends Request {
  member: Member;
  session: Request["session"] & {
    member: Member;
  };
}
// Bu interface — Express request’ni kengaytirib, unga login bo‘lgan member va session
// ichidagi member borligini TypeScript’ga aniq aytish uchun ishlatiladi.
