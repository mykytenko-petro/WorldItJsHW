import express from "express";
import { postRouter } from "./routers/post";

const PORT = 8000;
const HOST = "localhost";

const app = express();

app.use(express.json());
app.use("/", postRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
});

// TODO: remake from tsup to ts-node