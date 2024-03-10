import { Router } from "express";
import { createPost, updatePost } from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
const post_router = Router();

post_router.route("/create-post").post(protectRoute, createPost);
post_router.route("/update-post/:id").post(protectRoute, updatePost);

export default post_router;
