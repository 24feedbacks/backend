"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (Controller) => {
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
    ];
};
