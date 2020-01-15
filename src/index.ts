import { Options } from "graphql-yoga";
import app from "./app";

const PLAY_GROUND: string = "/playground";
const END_POINT: string = "/endpoint";
const PORT: number = 4000;

const appOptions: Options = {
    playground: PLAY_GROUND,
    endpoint: END_POINT,
    port: PORT
};

const conn = () => console.log(`GraphQL Server is Running To ${PORT}`);

app.start(appOptions, conn);