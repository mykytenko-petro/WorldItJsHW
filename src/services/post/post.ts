import type { PostRepositoryContract } from "../../domain/post/repository";
import type { PostServiceContract } from "./post.types";

export function createPostService(repository: PostRepositoryContract): PostServiceContract {
    return {
        getAllPosts(category?: string, take?: number) {
            return repository.getAll(category, take);
        },

        getPostById(id: number) {
            return repository.getById(id);
        },

        createPost(
            title: string,
            content: string,
            author: string,
            category: string
        ) {
            return repository.addPost(title, content, author, category)
        }
    }
}
