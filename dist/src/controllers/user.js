"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    service;
    hasher;
    constructor(service) {
        this.service = service;
    }
    create = async (request, response) => {
        try {
            return this.service.create(request.body, response);
        }
        catch (err) {
            console.log(err);
        }
    };
    login = async (request, response) => {
        try {
            if (this.service.login)
                return this.service.login(request.body, response);
        }
        catch (err) {
            console.log(err);
        }
    };
    update = async (request, response) => {
        try {
            return this.service.update(request.body, response);
        }
        catch (err) {
            console.log(err);
        }
    };
    delete = async (request, response) => {
        const { params } = request;
        try {
            return this.service.delete(params.id, response);
        }
        catch (err) {
            console.log(err);
        }
    };
    list = async (request, response) => {
        try {
            return this.service.list(response);
        }
        catch (err) {
            console.log(err);
        }
    };
    read = async (request, response) => {
        const { params } = request;
        try {
            return this.service.read(params?.id, response);
        }
        catch (err) {
            console.log(err);
        }
    };
    getFreeManangers = async (request, response) => {
        try {
            if (this.service.getFreeManangers)
                return this.service.getFreeManangers(response);
        }
        catch (err) {
            console.log(err);
        }
    };
    getUsersWithCategories = async (request, response) => {
        try {
            if (this.service.listWithCategories)
                return this.service.listWithCategories(response);
        }
        catch (err) {
            console.log(err);
        }
    };
}
exports.default = UserController;
