import { Resolvers } from "../../../types/resolvers";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../types/graph";
import { validate } from "class-validator";
import User from "../../../entities/User/User";

/**
 *  Validator
 *  [1] 존재하는 이메일
 *  [2] 이메일 형식
 */
const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const { email, password } = args;
            try {
                const existUser: User | undefined = await User.findOne({
                    email
                });
                /** [1] */
                if(!existUser) {
                    const user: User = await User.create({
                        ...args
                    });
                    /** [2] */
                    const data = await validate(user);
                    if(data.length > 0) { // isError
                        const { constraints: { isEmail } }: any = data[0];
                        return {
                            ok: false,
                            error: isEmail || "error",
                            token: null
                        };
                    }
                    await user.save();
                    return {
                        ok: true,
                        error: null,
                        token: "Comming soon"
                    };

                } else {
                    return {
                        ok: false,
                        error: "This email is already taken",
                        token: null
                    };
                }

            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};

export default resolvers;