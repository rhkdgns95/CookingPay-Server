import { Resolvers } from "../../../types/resolvers";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../types/graph";
import { validate } from "class-validator";
import User from "../../../entities/User/User";
import { createJWT } from "../../../utils/createJWT";

/**
 *  Validator
 *  [1] 존재하는 이메일
 *  [2] 이메일 형식
 *  [3] <예정사항> - name, email, password 의 문자열 길이 확인
 */
const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const { email } = args;
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
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        token
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