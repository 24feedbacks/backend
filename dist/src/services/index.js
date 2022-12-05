"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../database/postgres");
class Service {
    repository;
    entity;
    constructor(entitiy) {
        this.repository = postgres_1.postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }
    create = async (company, response) => {
        try {
            const create = await this.repository.save(company);
            return response.status(201).send({
                id: create?.id,
            });
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
            const companies = await this.repository.find();
            if (companies.length == 0) {
                return response
                    .status(204)
                    .send({ message: "No companies found!" });
            }
            return response.send(companies);
        }
        catch (err) {
            throw err;
        }
    };
    read = async (params, response) => {
        try {
            const team = await this.repository.findOne({
                where: { id: params.id },
            });
            return response.send(team);
        }
        catch (err) {
            console.log(err);
            return response.status(500).send(err);
        }
    };
}
exports.default = Service;
