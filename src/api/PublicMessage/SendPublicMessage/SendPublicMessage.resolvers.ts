import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import { SendPublicMessageMutationArgs, SendPublicMessageResponse } from "../../../types/graph";
import User from "../../../entities/User/User";
import PublicMessage from "../../../entities/Message/PublicMessage";

const resolvers: Resolvers = {
    Mutation: {
        SendPublicMessage: privateResolvers(async (_, args: SendPublicMessageMutationArgs, { req }): Promise<SendPublicMessageResponse> => {
            const user: User = req.user;
            const { text }  = args;
            try {
                const publicMessage: PublicMessage = await PublicMessage.create({
                    text,
                    writer: user
                }).save();
                return {
                    ok: true,
                    error: null,
                    messageId: publicMessage.id
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    messageId: null
                };
            }
        })
    }
};

export default resolvers;