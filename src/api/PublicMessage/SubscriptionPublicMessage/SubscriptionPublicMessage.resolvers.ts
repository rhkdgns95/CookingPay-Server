import { withFilter } from "graphql-yoga"
import { CHANNEL_PUBLIC_MESSAGE, CHANNEL_PUBLIC_MESSAGE_FAKE } from "../../../app";
import PublicMessage from "../../../entities/Message/PublicMessage";

const resolvers = {
    Subscription: {
        SubscriptionPublicMessage: {
            subscribe: withFilter(
                (_, __, { pubSub, context }) => {
                    if(context && context.currentUser) {
                        /** 로그인 유저 O, 메시지 정상 출력.  */
                        // console.log("로그인 O");
                        return pubSub.asyncIterator(CHANNEL_PUBLIC_MESSAGE);
                    } else {
                        /** 로그인 유저 X, 메시지 FAKE 출력.  */
                        // console.log("로그인 X");
                        return pubSub.asyncIterator(CHANNEL_PUBLIC_MESSAGE_FAKE);
                    }
                },
                async (payload) => {
                    /**
                     *  메시지 검증 
                     * 
                     *  추가 사항으로 메시지를 검증한다. 
                     *  만약 검증할 필요가 없다면, 
                     *  아래 과정을 생략 후 단순히 return true; 한다.
                     * 
                     */
                    if(payload && payload.SubscriptionPublicMessage) {
                        const { id } = payload.SubscriptionPublicMessage;
                        try {
                            const existMessage = await PublicMessage.findOne({ id });
                            if(existMessage) {
                                // console.log("메시지 검증 확인.");
                                return true;
                            } else {
                                // console.log("메시지 검증 실패.");    
                                return false;
                            }
                        } catch(error){
                            return false;
                        }
                    } else {
                        // console.log("PAYLOAD 메시지 없다.");
                        return false;
                    }
                }
            )
        }
    }
};

export default resolvers;