import { GraphQLServer, PubSub } from 'graphql-yoga';
import helmet from "helmet";
import logger from "morgan";
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
                    context
                };
            },
        });
        this.middlewares();
    }

    private middlewares = (): void => {
        this.app.express.use(helmet());
        this.app.express.use(logger('dev'));
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

export default new App().app;