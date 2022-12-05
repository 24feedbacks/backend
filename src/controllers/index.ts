import { Request, Response } from "../types/http";
import { IService } from "../types/IService";

export default class Controller {
    public service: IService;

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
        const params = request.params;
        try {
            return this.service.read(params, response);
        } catch (err) {
            console.log(err);
        }
    };
}
