"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../database/postgres");
class FeedbackService {
    repository;
    entity;
    constructor(entitiy) {
        this.repository = postgres_1.postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }
    async listSend(userId) {
        return this.repository.find({
            where: { sender: { id: userId } },
            relations: ["reciever"],
        });
    }
    async listRecieve(userId) {
        return this.repository.find({
            where: { reciever: { id: userId } },
            relations: ["sender"],
        });
    }
}
exports.default = FeedbackService;
