"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generateRoutes_1 = __importDefault(require("./generateRoutes"));
const controllers_1 = __importDefault(require("../controllers"));
const services_1 = __importDefault(require("../services"));
const user_1 = __importDefault(require("../services/user"));
const User_1 = __importDefault(require("entities/User"));
const hasher_1 = __importDefault(require("./hasher"));
const user_2 = __importDefault(require("controllers/user"));
const generateUserRoutes_1 = __importDefault(require("./generateUserRoutes"));
const helperRoutes_1 = __importDefault(require("./helperRoutes"));
const entityPath = path_1.default.join(__dirname, "../entities");
const entitiyFiles = fs_1.default.readdirSync(entityPath);
exports.default = (server) => {
    entitiyFiles.forEach((file) => {
        const prefix = file.split(".")[0].toLowerCase();
        const entity = require(`${entityPath}/${file}`).default;
        let routes;
        if (prefix !== "user") {
            routes = (0, generateRoutes_1.default)(new controllers_1.default(new services_1.default(entity)));
        }
        else {
            routes = (0, generateUserRoutes_1.default)(new user_2.default(new user_1.default(User_1.default, new hasher_1.default(Number(process.env.SALT_ROUNDS)))));
        }
        routes.forEach((route) => {
            route.url = `/${prefix}${route.url}`;
            server.route(route);
        });
    });
    (0, helperRoutes_1.default)().forEach((route) => {
        server.route(route);
    });
};
