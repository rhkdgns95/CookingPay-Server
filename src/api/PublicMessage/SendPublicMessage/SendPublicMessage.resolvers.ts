import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import { SendPublicMessageMutationArgs, SendPublicMessageResponse } from "../../../types/graph";
import User from "../../../entities/User/User";
import PublicMessage from "../../../entities/Message/PublicMessage";
import { CHANNEL_PUBLIC_MESSAGE, CHANNEL_PUBLIC_MESSAGE_FAKE } from "../../../app";
import { PubSub } from "graphql-yoga";

const resolvers: Resolvers = {
    Mutation: {
        SendPublicMessage: privateResolvers(async (_, args: SendPublicMessageMutationArgs, { req, pubSub }: { req: any, pubSub: PubSub }): Promise<SendPublicMessageResponse> => {
            const user: User = req.user;
            const { text }  = args;
            try {
                const publicMessage: PublicMessage = await PublicMessage.create({
                    text,
                    writer: user
                }).save();

                /**
                 *  로그인 유저 - 정상 출력
                 *  로그아웃 유저 - text값으로 FAKE 출력.
                 */
                pubSub.publish(CHANNEL_PUBLIC_MESSAGE, { SubscriptionPublicMessage: publicMessage });
                pubSub.publish(CHANNEL_PUBLIC_MESSAGE_FAKE, { SubscriptionPublicMessage: { ...publicMessage, text: "FAKE MESSAGE" }});

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