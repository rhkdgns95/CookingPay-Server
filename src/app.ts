import { GraphQLServer } from 'graphql-yoga';
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import schema from "./schema";
import User from './entities/User/User';
import { decodeJWT } from "./utils/decodeJWT";

class App {
    public app: GraphQLServer;

    constructor() {
        this.app = new GraphQLServer({
            schema,
            context: req => {
                return {
                    req: req.request
                }
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
            console.log("TOKEN: ", token);
            const user: User | undefined = await decodeJWT(token);
            if(user) {
                req.user = user;
            }
        }
        next();
    }

};

export default new App().app;