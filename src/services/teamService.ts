import { Repository, EntityTarget } from "typeorm";
import { postgresConnection } from "../database/postgres";
import Improvements from "../entities/Improvements";
import Team from "../entities/Team";

export default class TeamService {
    repository: Repository<Team>;
    entity: Object;

    constructor(entitiy: EntityTarget<Team>) {
        this.repository = postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }

    public async listTeamsByMananger(userId: string): Promise<Team[]> {
        return this.repository.find({
            where: { mananger: { id: userId } },
            relations: ["colaborators"],
        });
    }

    public async listTeam(teamId: string): Promise<Team[]> {
        return this.repository.find({
            where: { id: teamId },
            relations: ["colaborators"],
        });
    }
}
