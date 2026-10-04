import type { PostRepositoryContract } from "../domain/post/repository";
import type { Database } from "./types";

export function createPostRepository(db: Database): PostRepositoryContract {
    return {
        async getAll(category?: string, take?: number) {
            if (category) {
                return await db.orm.public.Post.where({category: category}).all();
            }

            if (take) {
                return await db.orm.public.Post.limit(take).all();
            }

            if (category && take) {
                return await db.orm.public.Post.where({category: category}).limit(take).all();
            }

            console.log(2232)

            return await db.orm.public.Post.all();
        },

        async getById(id: number) {
            return await db.orm.public.Post.where({id: id}).first()
        },

        async addPost(
            title: string,
            content: string,
            author: string,
            category: string
        ) {
            return await db.orm.public.Post.create({
                title: title,
                content: content,
                author: author,
                category: category
            })
        }
    };
}
