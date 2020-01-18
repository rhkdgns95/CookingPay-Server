import { Resolvers } from "../../../types/resolvers";
import { GetAllPostResponse } from "../../../types/graph";
import Post from "../../../entities/Post/Post";

const resolvers: Resolvers = {
    Query: {
        GetAllPost: async (): Promise<GetAllPostResponse> => {
            try {
                const posts: Post[] = await Post.find({
                    order: { createdAt: "DESC" },
                    relations: ['writer', 'photoUrls']
                });

                return {
                    ok: true,
                    error: null,
                    posts
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    posts: null
                };
            }
        }
    }
};

export default resolvers;