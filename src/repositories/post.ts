import type { PostEntity } from "../domain/post/entity";
import type { PostRepositoryContract } from "../domain/post/repository";

const posts: PostEntity[] = [];

export function createPostRepository(): PostRepositoryContract {
    return {
        getAll(category?: string, take?: number) {
            return posts
                .filter(p => !category || p.category === category)
                .slice(0, take);
        },

        getById(id: number) {
            return posts.find(p => p.id === id);
        },

        addPost(
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
    };
}
