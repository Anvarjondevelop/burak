import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

/** Restaurant */
routerAdmin.get("/", restaurantController.goHome); // routerAdmin kirib kelayotgan requeslarning endpoint iga raqab controllerga yuboradi
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignUp)
  .post("/signup", restaurantController.processSignup);

/** Product */
/** User */

export default routerAdmin;
