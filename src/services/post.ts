import * as repository from "../repositories/post";

export function getAllPosts(category?: string, take?: number) {
    return repository.getAll(category, take);
}

export function getPostById(id: number) {
    return repository.getById(id);
}

export function createPost(
    title: string,
    content: string,
    author: string,
    category: string
) {
    return repository.addPost(title, content, author, category)
}