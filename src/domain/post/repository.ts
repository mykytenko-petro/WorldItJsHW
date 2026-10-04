import type { PostEntity } from "./entity";

export interface PostRepositoryContract {
    getAll: (category?: string, take?: number) => Promise<PostEntity[]>;
    getById: (id: number) => Promise<PostEntity | null>;
    addPost: (
        title: string,
        content: string,
        author: string,
        category: string
    ) => Promise<PostEntity | null>;
}