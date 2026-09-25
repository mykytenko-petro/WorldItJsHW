import * as service from "../../services/post";
import type { Request, Response } from "express";
import type { CreatePostBody, GetPostByIdParams, GetPostsQuery } from "../dto/requests";
import type { PostResponse } from "../dto/responses";
import type { NotFoundErrorResponse, ValidationErrorResponse } from "../dto/errors";

export function getAllPosts(
    req: Request<unknown, unknown, unknown, GetPostsQuery>,
    res: Response<PostResponse[] | ValidationErrorResponse>
) {
    const { category, take } = req.query;

    let parsedCategory: string | undefined;
    if (category !== undefined && category !== null) {
        if (typeof category !== "string" || category.trim().length === 0) {
            return res.status(422).json({ error: "Query parameter 'category' must be a non-empty string." });
        }
        parsedCategory = category.trim();
    }

    let parsedTake: number | undefined;
    if (take !== undefined && take !== null) {
        const num = Number(take);
        if (typeof take !== "string" && typeof take !== "number") {
            return res.status(422).json({ error: "Query parameter 'take' must be a valid number or string." });
        }
        if (isNaN(num) || !Number.isInteger(num) || num <= 0 || num > 2) {
            return res.status(422).json({ error: "Query parameter 'take' must be a positive integer and not bigger than 2." });
        }
        parsedTake = num;
    }

    const result = service.getAllPosts(parsedCategory, parsedTake);

    return res.status(200).json(result);
}

export function getPostById(
    req: Request<GetPostByIdParams>,
    res: Response<PostResponse | ValidationErrorResponse | NotFoundErrorResponse>
) {
    const { id } = req.params;

    const parsedId = Number(id);
    if (!id || typeof id !== "string" || isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
        return res.status(422).json({ error: "Route parameter 'id' must be a positive integer." });
    }

    const result = service.getPostById(parsedId);
    if (!result) {
        return res.status(404).json({ error: `Post with ID ${parsedId} not found.` });
    }

    return res.status(200).json(result);
}

export async function createPost(
    req: Request<unknown, unknown, CreatePostBody>,
    res: Response<PostResponse | ValidationErrorResponse>
) {
    const body = req.body;

    if (
        !body ||
        typeof body !== "object" ||
        typeof body.title !== "string" || body.title.trim().length === 0 ||
        typeof body.content !== "string" || body.content.trim().length === 0 ||
        typeof body.author !== "string" || body.author.trim().length === 0 ||
        typeof body.category !== "string" || body.category.trim().length === 0
    ) {
        return res.status(422).json({
            error: "Invalid payload. 'title', 'content', 'author', and 'category' are required non-empty strings."
        });
    }

    const result = await service.createPost(
        body.title.trim(),
        body.content.trim(),
        body.author.trim(),
        body.category.trim()
    );

    return res.status(201).json(result);
}