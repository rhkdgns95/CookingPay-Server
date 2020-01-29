import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User/User";

const resolvers: Resolvers = {
    Query: {
        GetUserList: async () => {
            try {
                const users: User[] = await User.find({
                   order: { createdAt: "ASC" } 
                });
                return {
                    ok: true,
                    error: null,
                    users
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    users: null
                };
            }
        }
    }
};

export default resolvers;