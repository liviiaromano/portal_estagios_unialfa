import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

import { Empresa } from "./Empresa";

@Entity("vagas")
export class Vaga {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column("text")
  descricao!: string;

  @Column()
  local!: string;

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  salario!: number;

  @ManyToOne(() => Empresa, {
    eager: true,
  })
  @JoinColumn({
    name: "empresa_id",
  })
  empresa!: Empresa;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}