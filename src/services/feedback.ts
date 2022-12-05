import { Repository, EntityTarget } from "typeorm";
import { postgresConnection } from "../database/postgres";
import Feedback from "../entities/Feedback";

export default class FeedbackService {
    repository: Repository<Feedback>;
    entity: Object;

    constructor(entitiy: EntityTarget<Feedback>) {
        this.repository = postgresConnection.getRepository(entitiy);
        this.entity = entitiy;
    }

    public async listSend(userId: string): Promise<Feedback[]> {
        return this.repository.find({
            where: { sender: { id: userId } },
            relations: ["reciever"],
        });
    }

    public async listRecieve(userId: string): Promise<Feedback[]> {
        return this.repository.find({
            where: { reciever: { id: userId } },
            relations: ["sender"],
        });
    }
}
