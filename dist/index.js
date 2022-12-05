"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const postgres_1 = require("./src/database/postgres");
const fastify_1 = __importDefault(require("fastify"));
const setupRoutes_1 = __importDefault(require("helpers/setupRoutes"));
const cors_1 = __importDefault(require("@fastify/cors"));
const serverOptions = {
    port: Number(process.env.PORT) || 3000,
};
const server = (0, fastify_1.default)();
server.register(cors_1.default, {
    origin: "*",
});
try {
    (0, setupRoutes_1.default)(server);
}
catch (err) {
    console.log(err);
}
postgres_1.postgresConnection
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
    .catch((err) => console.log(err));
