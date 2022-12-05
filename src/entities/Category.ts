import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: false })
    name: string;

    @OneToMany(() => User, (user) => user.category)
    users: User[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
