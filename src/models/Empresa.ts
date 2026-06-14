import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "empresas" })
export class Empresa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  cnpj!: string;

  @Column({ unique: true })
  email!: string;

  // Não retorna a senha nas consultas por padrão
  @Column({ select: false })
  senha!: string;

  @Column()
  telefone!: string;

  @Column({ default: "PENDENTE" })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}