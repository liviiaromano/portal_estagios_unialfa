import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("alunos")
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  // Não retorna a senha nas consultas
  @Column({ select: false })
  senha!: string;

  @Column({ nullable: true })
  curso!: string;

  @Column({ default: true })
  aptoEstagio!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}