import { Resolvers } from "../../../types/resolvers";
import { GetPublicMessageResponse } from "../../../types/graph";
import User from "../../../entities/User/User";
import PublicMessage from "../../../entities/Message/PublicMessage";

const resolvers: Resolvers = {
    Query: {
        GetPublicMessage: async(_, __, { req }): Promise<GetPublicMessageResponse> => {
            const user: User | undefined = req?.user || undefined;
            try {
                let publicMessages: Array<PublicMessage> = await PublicMessage.find({
                    order: { createdAt: "ASC" }   
                });
                // No Login User: text - Fake Message
                return {
                    ok: true,
                    error: null,
                    publicMessages: user ? publicMessages :
                    publicMessages.map(item => { 
                        return {
                            ...item, 
                            text:  "Fake Message" 
                        }
                    })
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    publicMessages: null
                };
            }
        }
    }
};

export default resolvers;