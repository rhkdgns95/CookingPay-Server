import { Resolvers } from "./../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetUsers: async () => {
            return {
                ok: true,
                error: "Comming soon."
            }
        }
    }
};

export default resolvers;