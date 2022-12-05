"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../database/postgres");
class UserService {
    repository;
    entity;
    hasher;
    constructor(entitiy, hasher) {
        this.repository = postgres_1.postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
        this.hasher = hasher;
    }
    create = async (user, response) => {
        try {
            const { password } = user;
            let userToCreate = {
                ...user,
                password: await this.hasher.hash(password),
            };
            const userCreated = await this.repository.save(userToCreate);
            return response.status(201).send(userCreated);
        }
        catch (err) {
            console.log(err);
            return response.status(500).send(err);
        }
    };
    update = async (company, response) => {
        try {
            const update = await this.repository.update(company.id, company);
            if (update.affected) {
                return response.status(201).send({
                    message: `Company ${company.id} updated successfully!`,
                });
            }
            else {
                return response.status(204).send({
                    message: `Company ${company.id} not updated!`,
                });
            }
        }
        catch (err) {
            console.log(err);
            return response.status(500).send(err);
        }
    };
    delete = async (id, response) => {
        try {
            const deleted = await this.repository.delete(id);
            if (deleted.affected) {
                return response.status(204).send({
                    message: `Company ${id} deleted successfully!`,
                });
            }
            else {
                return response
                    .status(404)
                    .send({ message: "Company not deleted!" });
            }
        }
        catch (err) {
            console.log(err);
            return response.status(500).send(err);
        }
    };
    list = async (response) => {
        try {
            const users = await this.repository.find();
            if (users.length == 0) {
                return response
                    .status(204)
                    .send({ message: "No users found!" });
            }
            users.forEach((user) => {
                delete user["password"];
            });
            return response.send(users);
        }
        catch (err) {
            throw err;
        }
    };
    read = async (id, response) => {
        try {
            const user = await this.repository.findOne({
                where: { id },
                relations: ["category"],
            });
            delete user["password"];
            return response.send(user);
        }
        catch (err) {
            console.log(err);
            return response.status(500).send(err);
        }
    };
    login = async (user, response) => {
        try {
            const { email, password } = user;
            const userFound = await this.repository.findOne({
                where: { email },
                relations: ["category", "team"],
                loadEagerRelations: true,
            });
            if (!userFound) {
                return response
                    .status(404)
                    .send({ message: "User not found!" });
            }
            const isAuthenticate = await this.hasher.compare(password, userFound.password);
            if (!isAuthenticate) {
                return response.status(401).send({ message: "Unauthorized!" });
            }
            delete userFound["password"];
            return response.status(200).send(userFound);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };
    getFreeManangers = async (response) => {
        try {
            const manangers = await this.repository.find({
                where: { category: { name: "mananger" } },
                relations: ["category", "team"],
            });
            if (manangers.length == 0) {
                return response
                    .status(204)
                    .send({ message: "No free managers found!" });
            }
            return response.send(manangers);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };
    listWithCategories = async (response) => {
        try {
            const users = await this.repository.find({
                relations: ["category"],
            });
            return response.send(users);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };
}
exports.default = UserService;
