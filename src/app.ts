import { GraphQLServer, PubSub } from 'graphql-yoga';
import helmet from "helmet";
// import logger from "morgan";
import cors from "cors";
import schema from "./schema";
import User from './entities/User/User';
import { decodeJWT } from "./utils/decodeJWT";

/**
 *  [1] SubscriptionPublicMessage의 채널
 * 
 *  CHANNEL_PUBLIC_MESSAGE
 *  - 로그인 유저의 PublicMessage 구독하는 채널
 *  CHANNEL_PUBLIC_MESSAGE_FAKE: 
 *  - 로그인 하지 않는 PublicMessage 구독하는 채널
 */

export const CHANNEL_PUBLIC_MESSAGE: string = "PUBLIC_CHAT";
export const CHANNEL_PUBLIC_MESSAGE_FAKE: string = "PUBLIC_CHAT_FAKE";

class App {
    public app: GraphQLServer;
    public pubSub: PubSub;
    /**
     *  publicMessageUsers:
     *   - 구독하는 유저들의 ID를 저장함.
     *   - 이건 Playground에서 올바르게 작동하지 않으며, 
     *     클라이언트의 onConnect/onDisconnect요청에 따라서 
     *     구독자들의 연결/해제를 확인함.
     */
    public publicMessageUsers: Array<number> = []; 

    constructor() {
        this.pubSub = new PubSub();
        this.app = new GraphQLServer({
            schema,
            context: req => {
                const { connection: { context = null } = {}} = req;
                
                // console.log("Subscription [2]: ", context);
                return {
                    req: req.request,
                    pubSub: this.pubSub,
                    context,
                    publicMessageUsers: this.publicMessageUsers
                };
            },
        });
        this.middlewares();
    }
    public pushPublicChatUser = (userId: number) => {
        // 여기서 중복해서 유저 명이 들어가면, 
        // 다른 기기에서 로그인 한 것이다.
        this.publicMessageUsers.push(userId);
    }

    public popPublicChatUser = (deletedUserId: number) => {
        this.publicMessageUsers = publicMessageUsers.filter(id => id !== deletedUserId);
    }

    private middlewares = (): void => {
        this.app.express.use(helmet());
        // this.app.express.use(logger('dev'));
        this.app.express.use(cors());
        this.app.express.use(this.jwt as any);
    }
    
    private jwt = async (req: any, res: Response, next: any): Promise<any> => {
        const token = req.get('X-JWT');
        
        if(token) {
            // console.log("TOKEN: ", token);
            const user: User | undefined = await decodeJWT(token);
            if(user) {
                req.user = user;
            }
        }
        next();
    }
};

const appServer = new App();
export const { publicMessageUsers,popPublicChatUser, pushPublicChatUser } = appServer;
export default appServer.app;
// export default new App().app;