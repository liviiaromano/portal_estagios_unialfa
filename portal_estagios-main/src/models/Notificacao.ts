import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { Aluno } from "./Aluno";

@Entity("notificacoes")
export class Notificacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Aluno, { eager: true })
  aluno!: Aluno;

  @Column("text")
  mensagem!: string;

  @Column({ default: false })
  lida!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}