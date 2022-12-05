"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../database/postgres");
class TeamService {
    repository;
    entity;
    constructor(entitiy) {
        this.repository = postgres_1.postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }
    async listTeamsByMananger(userId) {
        return this.repository.find({
            where: { mananger: { id: userId } },
            relations: ["colaborators"],
        });
    }
    async listTeam(teamId) {
        return this.repository.find({
            where: { id: teamId },
            relations: ["colaborators"],
        });
    }
}
exports.default = TeamService;
