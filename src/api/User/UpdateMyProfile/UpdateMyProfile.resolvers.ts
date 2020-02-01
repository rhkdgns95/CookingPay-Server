import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import User from "../../../entities/User/User";
import { cleanNullArgs } from "../../../utils/cleanNullArgs";
import { destroyCloudinary } from "../../../utils/destroyCloudinary";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolvers(async(_, args:UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse>  => {
            const user: User = req.user;
            try {
                const nullArgs: any = cleanNullArgs(args);
                /**
                 *  패스워드가 있는경우: 
                 *    @BeforeInsert
                 *    @BeforeUpdate 
                 *  - 패스워드는 위의 두 가지 상황에따라 암호화 저장된다.
                 *  - 값이 처음에 삽입되는경우와 값이 업데이트 되는경우가있다.
                 *  - 이때마다 bcrypt암호화 되어지는데, 위 두가지의 경우는 객체를 생성하여 저장할때만 작동함. 
                 *    (user.save()와 같이 user라는 DB객체가 생성될때가 말이다.)
                 *  - 그래서 아래의 유저의 패스워드가 수정되는경우를 따로두어서 저장시킬 필요가 있다.
                 */
                if(nullArgs.password) {
                    user.password = nullArgs.password;
                    await user.save();
                    delete nullArgs.password;
                }
                /**
                 *   Photo설정 여부:
                 *   
                 *    1. Photo가 없는경우,
                 *      - 기존에 존재하는 Photo가 있다면, 저장소에서 제거. (user.photo가 있는경우)
                 *    2. Photo가 변경된 경우,
                 *      - 기존에 존재하는 Photo를 제거 후, 새로운 Photo의 주소로 업데이트. (user.photo가 있는경우)
                 *    3. Photo가 그대로인 경우,
                 *      - 기존의 Photo와 동일하다면, 상관 X
                 */
                if(nullArgs.photo) {
                    if(nullArgs.photo === "") {
                        /** [1] */
                        nullArgs.photo = null;
                        if(user.publicId) {
                            await destroyCloudinary(user.publicId);
                        }     
                    } else if(user.publicId && user.photo !== nullArgs.photo) {
                        /** [2] */
                        await destroyCloudinary(user.publicId);
                    } 
                    /** [3] Pass */ 
                } 

                await User.update(
                    { id: user.id }, 
                    { ...nullArgs,}
                );

                return {
                    ok: true,
                    error: null
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        })
    }
};

export default resolvers;