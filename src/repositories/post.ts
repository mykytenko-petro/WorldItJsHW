import type { PostEntity } from "../services/types";

const posts: PostEntity[] = [];

export function getAll(category?: string, take?: number) {
    return posts
        .filter(p => !category || p.category === category)
        .slice(0, take);
}

export function getById(id: number) {
    return posts.find(p => p.id === id);
}

export function addPost(
    title: string,
    content: string,
    author: string,
    category: string
): Promise<PostEntity> {
    return new Promise((resolve) => {
        const post: PostEntity = {
            id: posts.length + 1,
            title: title,
            content: content,
            author: author,
            category: category
        }

        posts.push(post);

        resolve(post);
    });
}
