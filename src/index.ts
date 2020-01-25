import dotenv from "dotenv";
dotenv.config();

import { createConnection } from 'typeorm';
import { Options } from "graphql-yoga";
import app from "./app";
import connectionOption from "./ormConfig";
import User from "./entities/User/User";
import { decodeJWT } from "./utils/decodeJWT";

const PLAY_GROUND: string = "/playground";
const GRPAHQL_ENDPOINT: string = "/graphql";
const PORT: number = 4000;
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

/**
 *  subscriptions 
 *  - onConnect는 Subscription이 실행될때 제일먼저 콜백된다.
 *    > 로그인 유저를 판별하기 위한용도이다. 
 *    >  로그인 하지 않는경우는 다른 FAKE메시지를 구독하도록 함.
 *    >  return 값이 GraphqlServer의 context에서 req.connection에 
 */ 
const appOptions: Options = {
    port: PORT,
    playground: PLAY_GROUND,
    endpoint: GRPAHQL_ENDPOINT,
    subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
        onConnect: async connectionParams => {
            const token = connectionParams["X-JWT"];
            // console.log("Subscription [1]");
            if(token) {
                const user: User | undefined = await decodeJWT(token);
                if(user) {
                    return {
                        currentUser: user
                    };
                } else {
                    return {
                        currentUser: null
                    };
                }
            } else {
                return {
                    currentUser: null
                };
            }
        }
    }
};

const conn = () => console.log(`GraphQL Server is Running To ${PORT}`);

createConnection(connectionOption).then(() => {
    app.start(appOptions, conn);
}).catch(err => {
    console.log("DB error: ", err);
})