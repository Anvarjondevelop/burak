import express from "express";
import path from "path";
// import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
//Morgan — bu HTTP request logger middleware
//Ya’ni Expressga kelayotgan har bir so‘rovni (request) konsolga yoki faylga log qilib yozib beradi.

/** 1- ENTRANCE **/
const app = express();
// console.log("__dirname :", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));
//app.use bu => middleware design pattern

/** 2- SESSIONS**/

/** 3- VIEWS**/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4- ROUTERS**/
app.use("/admin", routerAdmin); //EJS //Middleware Design Pattern
// app.use("/", router); //SPA:REACT

export default app; // module.exports = app // default => 1 file da 1ta bo'ladi
