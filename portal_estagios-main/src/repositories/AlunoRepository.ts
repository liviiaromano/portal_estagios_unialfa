import { Repository } from "typeorm";
import { Aluno } from "../models/Aluno";

export class AlunoRepository {
  constructor(
    private repo: Repository<Aluno>
  ) {}

  async criar(data: Partial<Aluno>) {
    return this.repo.save(
      this.repo.create(data)
    );
  }

  async listar() {
    return this.repo.find();
  }

  async buscarPorId(id: number) {
    return this.repo.findOneBy({
      id,
    });
  }

  // Busca incluindo a senha para o login
  async buscarPorEmail(
    email: string
  ) {
    return this.repo
      .createQueryBuilder(
        "aluno"
      )
      .addSelect("aluno.senha")
      .where(
        "aluno.email = :email",
        { email }
      )
      .getOne();
  }

  async atualizar(
    id: number,
    data: Partial<Aluno>
  ) {
    await this.repo.update(
      id,
      data
    );

    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    return this.repo.delete(id);
  }
}