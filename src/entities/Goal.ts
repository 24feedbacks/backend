import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import Improvements from "./Improvements";

@Entity()
export default class Goal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column({ enum: ["low", "medium", "high"], default: "low" })
  priority: string;

  @Column()
  deadline: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.goals)
  user: User;

  @OneToMany(() => Improvements, (Improvements) => Improvements.goal, {
    cascade: ["remove"],
  })
  improvements: Improvements[];
}
