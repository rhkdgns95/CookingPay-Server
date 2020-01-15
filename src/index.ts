import dotenv from "dotenv";
dotenv.config();

import { createConnection } from 'typeorm';
import { Options } from "graphql-yoga";
import app from "./app";
import connectionOption from "./ormConfig";

const PLAY_GROUND: string = "/playground";
const END_POINT: string = "/endpoint";
const PORT: number = 4000;

const appOptions: Options = {
    playground: PLAY_GROUND,
    endpoint: END_POINT,
    port: PORT
};

const conn = () => console.log(`GraphQL Server is Running To ${PORT}`);

createConnection(connectionOption).then(() => {
    app.start(appOptions, conn);
}).catch(err => {
    console.log("DB error: ", err);
})