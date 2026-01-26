export enum HttpCode {
  OK = 200, //So‘rov to‘g‘ri bajarildi
  CREATED = 201, //Yangi ma’lumot (resurs) muvaffaqiyatli yaratildi
  NOT_MODIFIED = 304, //Ma’lumot o‘zgarmagan, eski holati ishlatiladi
  BAD_REQUEST = 400, //Client noto‘g‘ri ma’lumot yuborgan
  UNAUTHORIZED = 401, //Foydalanuvchi login qilmagan yoki token yo‘q / yaroqsiz
  FORBIDDEN = 403, //Foydalanuvchi login qilgan, lekin bu amalni bajarishga ruxsati yo‘q
  NOT_FOUND = 404, //So‘ralgan resurs mavjud emas
  INTERNAL_SERVER_ERROR = 500, //Server tomonda kutilmagan xatolik
}
export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong",
  NO_DATA_FOUND = "No data is found",
  CREATE_FAILED = " Create is failed",
  UPDATE_FAILED = "Update is failed",

  USED_NICK_PHONE = "You are inserting already used nick or phone!",
  NO_MEMBER_NICK = "No member with that member nick!",
  WRONG_PASSWORD = "Wrog pasword, please try again!",
}

class Errors extends Error {
  //Javascriptni ichida build in qilingan Error, Errors nomli class ga extend qilinsin
  public code: HttpCode;
  //code degan property bor va u faqat HttpCode enum ichidagi qiymatlarni qabul qiladi
  public message: Message;

  static standart = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  };

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export default Errors;

//Bu Errors class — backend’da xatoliklarni yagona standart bilan boshqarish uchun.
