import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";
//TCP — bu internet orqali ma’lumotlarni ishonchli va tartibli yetkazish qoidasi.
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    // console.log("dataaa", data);
    console.log("MongoDB connection successed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.info(`The server is runnig successfully on port: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    console.log("ERROR on connection Mongodb", err);
  });
