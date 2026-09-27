import express from "express";
import { createPostRepository } from "./repositories/post";
import { createPostService } from "./services/post/post";
import { createPostHandler } from "./transport/handlers/post/post";
import { createPostRouter } from "./routers/post/post";

const PORT = 8000;
const HOST = "localhost";

const app = express();

// composition root
const postRepository = createPostRepository();
const postService = createPostService(postRepository);
const postHandler = createPostHandler(postService);
const postRouter = createPostRouter(postHandler);

app.use(express.json());
app.use("/", postRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
});
