import Controller from "../controllers";
import UserController from "../controllers/user";
import { RouteOptions } from "fastify";

export default (Controller: UserController): RouteOptions[] => {
    return [
        {
            method: "GET",
            url: "/",
            handler: Controller.list,
        },
        {
            method: "GET",
            url: "/:id",
            handler: Controller.read,
        },
        {
            method: "POST",
            url: "/",
            handler: Controller.create,
        },
        {
            method: "PUT",
            url: "/:id",
            handler: Controller.update,
        },
        {
            method: "DELETE",
            url: "/:id",
            handler: Controller.delete,
        },
        {
            method: "POST",
            url: "/login",
            handler: Controller.login,
        },
        {
            method: "GET",
            url: "/manangers",
            handler: Controller.getFreeManangers,
        },
        {
            method: "GET",
            url: "/categories/",
            handler: Controller.getUsersWithCategories,
        },
    ];
};
