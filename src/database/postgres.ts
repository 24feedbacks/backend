import Entities from "../entities/Entities";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const postgresConnection = new DataSource({
    type: "postgres",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    entities: Entities,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
});
