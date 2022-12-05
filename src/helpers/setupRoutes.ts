import fs from "fs";
import path from "path";
import { FastifyInstance, RouteOptions } from "fastify";
import generateRoutes from "./generateRoutes";
import Controller from "../controllers";
import Service from "../services";
import UserService from "../services/user";
import User from "../entities/User";
import Bcrypt from "./hasher";
import UserController from "../controllers/user";
import generateUserRoutes from "./generateUserRoutes";
import helperRoutes from "./helperRoutes";

const entityPath = path.join(__dirname, "../entities");

const entitiyFiles = fs.readdirSync(entityPath);

export default (server: FastifyInstance) => {
    entitiyFiles.forEach((file) => {
        const prefix = file.split(".")[0].toLowerCase();
        const entity = require(`${entityPath}/${file}`).default;
        let routes: RouteOptions[];

        if (prefix !== "user") {
            routes = generateRoutes(new Controller(new Service(entity)));
        } else {
            routes = generateUserRoutes(
                new UserController(
                    new UserService(
                        User,
                        new Bcrypt(Number(process.env.SALT_ROUNDS))
                    )
                )
            );
        }

        routes.forEach((route) => {
            route.url = `/${prefix}${route.url}`;
            server.route(route);
        });
    });

    helperRoutes().forEach((route) => {
        server.route(route);
    });
};
