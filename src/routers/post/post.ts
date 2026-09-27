import { Router } from "express";
import type { PostHandlerContract } from "../../transport/handlers/post/post.types";

// TODO: make type annotation for router
export function createPostRouter(handler: PostHandlerContract) {
    const postRouter = Router();
    
    postRouter.get("/posts", handler.getAllPosts);
    postRouter.get("/posts/:id", handler.getPostById);
    postRouter.post("/posts", handler.createPost);

    return postRouter;
}
