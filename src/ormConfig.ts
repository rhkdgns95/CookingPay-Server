import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    entities: ["entities/**/*.*"],
    logging: true,
    synchronize: true,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "",
    port: 5432,
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
};

export default connectionOptions;