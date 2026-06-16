import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Aluno } from "./Aluno";
import { Vaga } from "./Vaga";

@Entity("candidaturas")
export class Candidatura {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Aluno, { eager: true })
  aluno!: Aluno;

  @ManyToOne(() => Vaga, { eager: true })
  vaga!: Vaga;

  @Column({ default: "PENDENTE" })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}