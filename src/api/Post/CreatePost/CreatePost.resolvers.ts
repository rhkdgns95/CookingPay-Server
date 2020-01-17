import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import { CreatePostMutationArgs, CreatePostResponse } from "../../../types/graph";
import User from "../../../entities/User/User";
import Post from "../../../entities/Post/Post";
import PostImage from "../../../entities/Post/PostImage";

const resolvers: Resolvers = {
    Mutation: {
        CreatePost: privateResolvers(async (_, args: CreatePostMutationArgs, { req }): Promise<CreatePostResponse>  => {
            const user: User = req.user;
            const { photoUrls, title, description} = args;
            try {
                const post: Post =  await Post.create({
                    title,
                    description,
                    writer: user
                }).save();

                if(photoUrls && photoUrls.length > 0) {
                    for(var i = 0; i < photoUrls.length; i++) {
                        await PostImage.create({
                            post,
                            url: photoUrls[i]
                        }).save();
                    }
                }
                
                return {
                    ok: true,
                    error: null,
                    postId: post.id
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    postId: null
                };
            }
        })
    }
};

export default resolvers;