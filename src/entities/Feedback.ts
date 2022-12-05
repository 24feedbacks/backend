import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import User from "./User";
import { Feelings } from "../types/Feedback";

@Entity()
export default class Feedback {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Feelings, default: Feelings.OK })
    feeling: Feelings;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    reciever: User;
}
