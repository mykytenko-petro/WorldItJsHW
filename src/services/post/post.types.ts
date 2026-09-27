import type { PostEntity } from "../../domain/post/entity";

export interface PostServiceContract {
    getAllPosts: (category?: string, take?: number) => PostEntity[];
    getPostById: (id: number) => PostEntity | undefined;
    createPost: (
        title: string,
        content: string,
        author: string,
        category: string
    ) => Promise<PostEntity>;
}