import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import Company from "./Company";
import Team from "./Team";

@Entity()
export default class Sector {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Company, (company) => company.sectors)
    company: Company;

    @OneToMany(() => Team, team => team.sector)
    teams: Team[];
}
