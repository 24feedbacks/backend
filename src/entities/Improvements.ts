import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import User from "./User";
import Goal from "./Goal";

@Entity()
export default class Improvements {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    description: string;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => User, { cascade: true })
    @JoinColumn()
    users: User[];

    @ManyToOne(() => Goal, (goal) => goal.improvements)
    goal: Goal;
}
