"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    service;
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
        const params = request.params;
        try {
            return this.service.read(params, response);
        }
        catch (err) {
            console.log(err);
        }
    };
}
exports.default = Controller;
