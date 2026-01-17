import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

routerAdmin.get("/", restaurantController.goHome); // routerAdmin kirib kelayotgan requeslarning endpoint iga raqab controllerga yuboradi
routerAdmin.get("/login", restaurantController.getLogin);
routerAdmin.get("/signup", restaurantController.getSignUp);

export default routerAdmin;
