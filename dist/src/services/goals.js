"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../database/postgres");
const Team_1 = __importDefault(require("entities/Team"));
class GoalsService {
    repository;
    entity;
    constructor(entitiy) {
        this.repository = postgres_1.postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }
    async list(userId) {
        return this.repository.find({
            relations: ["improvements"],
        });
    }
    async listByMananger(manangerId) {
        try {
            const teamRepository = postgres_1.postgresConnection.getRepository(Team_1.default);
            let goals = [];
            const team = await teamRepository.findOne({
                where: { mananger: { id: manangerId } },
                relations: ["colaborators"],
            });
            if (team) {
                const { colaborators } = team;
                const colaboratorsId = colaborators.map((colaborator) => colaborator.id);
                for (let index = 0; index < colaboratorsId.length; index++) {
                    const id = colaboratorsId[index];
                    const goalsFromUser = await this.repository.find({
                        where: { user: { id } },
                        relations: ["improvements", "user"],
                    });
                    goalsFromUser.forEach((goal) => goals.push(goal));
                }
                return goals;
            }
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.default = GoalsService;
