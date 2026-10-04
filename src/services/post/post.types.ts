import type { PostEntity } from "../../domain/post/entity";

export interface PostServiceContract {
    getAllPosts: (category?: string, take?: number) => Promise<PostEntity[]>;
    getPostById: (id: number) => Promise<PostEntity | null>;
    createPost: (
        title: string,
        content: string,
        author: string,
        category: string
    ) => Promise<PostEntity | null>;
}