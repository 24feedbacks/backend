require("dotenv").config();
import { postgresConnection } from "./src/database/postgres";
import Fastify from "fastify";
import setupRoutes from "./src/helpers/setupRoutes";
import cors from "@fastify/cors";

const serverOptions = {
    port: Number(process.env.PORT) || 3000,
};

const server = Fastify();

server.register(cors, {
    origin: "*",
});

try {
    setupRoutes(server);
} catch (err) {
    console.log(err);
}

postgresConnection
    .initialize()
    .then(() => {
        server.listen(serverOptions, (err, address) => {
            if (err) {
                server.log.error(err);
                process.exit(1);
            }

            console.log(`server listening on ${address}`);
        });
    })
    .catch((err) => {
        console.log(process.env);
        console.log(err);
    });
