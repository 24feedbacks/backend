"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConnection = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.postgresConnection = new typeorm_1.DataSource({
    type: "postgres",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: ["src/entities/*.ts"],
    synchronize: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
