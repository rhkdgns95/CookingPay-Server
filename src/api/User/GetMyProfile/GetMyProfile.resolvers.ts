import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import { GetMyProfileResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolvers(async (_, __, { req }): Promise<GetMyProfileResponse> => {
            const { user } = req;
            return {
                ok: true,
                error: null,
                user
            }    
        })
    }
};

export default resolvers;
