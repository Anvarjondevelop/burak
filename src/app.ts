import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
//Morgan — bu HTTP request logger middleware
//Ya’ni Expressga kelayotgan har bir so‘rovni (request) konsolga yoki faylga log qilib yozib beradi.
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

//ConnectMongoDB(session) — express-session’ga mos keladigan MongoDB Store class’ini yasab beradigan zavod (factory).
const MongoDBStore = ConnectMongoDB(session);

const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/** 1- ENTRANCE **/
const app = express();
// console.log("__dirname :", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));
//app.use bu => middleware design pattern

/** 2- SESSIONS**/
//Sessionlarni express web serveriga integratsiyasini amalga oshiradigan joy

app.use(
  session({
    secret: String(process.env.SESSION_SECRET), //Session ID’ni soxtalashtirib bo‘lmasligi uchun muhr bosildi
    cookie: {
      maxAge: 1000 * 3600 * 3, //3h |  muhr qancha vaqt amal qiladi
    },
    store: store, //Sessionlar RAM’da emas, MongoDB’da saqlansin | muhr ma’lumoti qayerda saqlanadi
    resave: true, // oxirgi login vaqtidan hisobga olsinsin | muhr har safar qayta bosiladimi?
    saveUninitialized: false, //hali ichida hech narsa bo‘lmagan sessionlarni ham bazaga saqlaydi. | bo‘sh muhr beriladimi?
  })
);
app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

/** 3- VIEWS**/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4- ROUTERS**/
app.use("/admin", routerAdmin); //SSR //EJS //Middleware Design Pattern
app.use("/", router); //SPA:REACT

export default app; // module.exports = app // default => 1 file da 1ta bo'ladi
