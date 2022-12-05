import Goal from "../entities/Goal";
import { Repository, EntityTarget } from "typeorm";
import { postgresConnection } from "../database/postgres";
import Team from "../entities/Team";

export default class GoalsService {
    repository: Repository<Goal>;
    entity: Object;

    constructor(entitiy: EntityTarget<Goal>) {
        this.repository = postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }

    public async list(userId: string): Promise<Goal[]> {
        return this.repository.find({
            relations: ["improvements"],
        });
    }

    public async listByMananger(manangerId: string) {
        try {
            const teamRepository = postgresConnection.getRepository(Team);
            let goals: any[] = [];

            const team = await teamRepository.findOne({
                where: { mananger: { id: manangerId } },
                relations: ["colaborators"],
            });

            if (team) {
                const { colaborators } = team;
                const colaboratorsId = colaborators.map(
                    (colaborator) => colaborator.id
                );

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
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
