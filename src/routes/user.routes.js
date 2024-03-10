import { Router } from "express";
import {
  getUserData,
  getUsers,
  updateUser,
  userLogin,
  userSignup,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const user_router = Router();

user_router.route("/signup").post(userSignup);
user_router.route("/login").post(userLogin);
user_router.route("/update-user/:id").post(updateUser);
user_router.route("/get-user/:token").get(getUserData);
user_router.route("/get-users/:id").get(protectRoute, getUsers);

export default user_router;
