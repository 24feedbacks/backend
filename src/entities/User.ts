import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Category from "./Category";
import Goal from "./Goal";
import Improvements from "./Improvements";
import Team from "./Team";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Team, (team) => team.colaborators, {
    nullable: true,
  })
  team: Team;

  @OneToMany(() => Goal, (goal) => goal.user, { cascade: ["remove", "update"] })
  goals: Goal[];

  @ManyToOne(() => Category, (category) => category.users, {
    cascade: ["remove", "update"],
  })
  category: Category;
}
