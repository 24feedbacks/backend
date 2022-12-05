import User from "../entities/User";
import { Request, Response } from "../types/http";
import IHasher from "../types/IHasher";
import { IService } from "../types/IService";

export default class UserController {
    private service: IService;
    private hasher: IHasher;

    constructor(service: IService) {
        this.service = service;
    }

    create = async (request: Request, response: Response) => {
        try {
            return this.service.create(request.body, response);
        } catch (err) {
            console.log(err);
        }
    };

    login = async (request: Request, response: Response) => {
        try {
            if (this.service.login)
                return this.service.login(<User>request.body, response);
        } catch (err) {
            console.log(err);
        }
    };

    update = async (request: Request, response: Response) => {
        try {
            return this.service.update(request.body, response);
        } catch (err) {
            console.log(err);
        }
    };

    delete = async (request: Request, response: Response) => {
        const { params } = <any>request;
        try {
            return this.service.delete(params.id, response);
        } catch (err) {
            console.log(err);
        }
    };

    list = async (request: Request, response: Response) => {
        try {
            return this.service.list(response);
        } catch (err) {
            console.log(err);
        }
    };

    read = async (request: Request, response: Response) => {
        const { params } = <any>request;
        try {
            return this.service.read(params?.id, response);
        } catch (err) {
            console.log(err);
        }
    };

    getFreeManangers = async (request: Request, response: Response) => {
        try {
            if (this.service.getFreeManangers)
                return this.service.getFreeManangers(response);
        } catch (err) {
            console.log(err);
        }
    };

    getUsersWithCategories = async (request: Request, response: Response) => {
        try {
            if (this.service.listWithCategories)
                return this.service.listWithCategories(response);
        } catch (err) {
            console.log(err);
        }
    };
}
