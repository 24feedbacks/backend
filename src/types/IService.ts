import User from "entities/User";
import { Response } from "./http";
import Goal from "../entities/Goal";

export interface IService {
    getFreeManangers?: (response: Response) => Promise<Response | null>;
    create: (data: any, response: Response) => Promise<Response>;
    update: (data: any, response: Response) => Promise<Response>;
    delete: (id: string, response: Response) => Promise<Response>;
    list: (response: Response) => Promise<Response>;
    read: (id: any, response: Response) => Promise<Response>;
    login?: (user: User, response: Response) => Promise<Response | null>;
    listWithCategories?: (response: Response) => Promise<Response | null>;
}
