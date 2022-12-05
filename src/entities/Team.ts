import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import Sector from "./Sector";
import User from "./User";

@Entity()
export default class Team {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => User)
    @JoinColumn()
    mananger: User;

    @OneToMany(() => User, user => user.team)
    colaborators: User[];

    @ManyToOne(() => Sector, (sector) => sector.teams)
    sector: Sector;
}
