import type { PostEntity } from "./entity";

export interface PostRepositoryContract {
    getAll: (category?: string, take?: number) => PostEntity[];
    getById: (id: number) => PostEntity | undefined;
    addPost: (
        title: string,
        content: string,
        author: string,
        category: string
    ) => Promise<PostEntity>;
}