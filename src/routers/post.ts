import { Router } from "express";
import * as handler from "../transport/handlers/post"

export const postRouter = Router();

postRouter.get("/posts", handler.getAllPosts);
postRouter.get("/posts/:id", handler.getPostById);
postRouter.post("/posts", handler.createPost);