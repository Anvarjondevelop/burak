import Errors from "../libs/types/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";
import { HttpCode } from "../libs/types/Errors";
import { Message } from "../libs/types/Errors";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }
  //Bu function user oldin shu productni ko‘rganmi yoki yo‘qmi tekshiradi.
  public async checkViewExistence(input: ViewInput): Promise<View> {
    return await this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec();
  }

  //Bu function yangi view yozadi.
  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return await this.viewModel.create(input);
    } catch (err) {
      console.log("Error, model : insertMemberView", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}
export default ViewService;

//viewRefId - biz ko'rgan mahsulot ObjectId si hisoblanadi
