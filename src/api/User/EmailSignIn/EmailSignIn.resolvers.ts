import { Resolvers } from "../../../types/resolvers";
import { EmailSignInQueryArgs, EmailSignInResponse } from "../../../types/graph";
import User from "../../../entities/User/User";

const resolvers: Resolvers = {
    Query: {
        EmailSignIn: async(_, args: EmailSignInQueryArgs): Promise<EmailSignInResponse> => {
            const { email, password } = args;
            try {
                const user: User | undefined = await User.findOne({
                    email
                });
                if(user) {
                    const isValid = user.comparePassword(password);
                    if(!isValid) {
                        return {
                            ok: false,
                            error: "Wrong password",
                            token: null
                        };
                    } else {
                        return {
                            ok: true,
                            error: null,
                            token: "comming soon"
                        };
                    } 
                } else {
                    return {
                        ok: false,
                        error: "Not found user",
                        token: null
                    };
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error,
                    token: null
                };
            }
        }
    }
};

export default resolvers;