import { Resolvers } from "../../../types/resolvers";
import { FindEmailQueryArgs, FindEmailResponse } from "../../../types/graph";
import User from "../../../entities/User/User";

const resolvers: Resolvers = {
    Query: {
        FindEmail: async (_, args: FindEmailQueryArgs): Promise<FindEmailResponse> => {
            const { name } = args;
            try {
                const user = await User.findOne({ name });
                if(user) {
                    return {
                        ok: true,
                        error: null,
                        email: user.email
                    };
                } else {
                    return {
                        ok: false,
                        error: "Not found user",
                        email: null
                    };
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    email: null
                };
            }
        }
    }
};

export default resolvers;