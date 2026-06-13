import { Repository } from "typeorm";
import { Candidatura } from "../models/Candidatura";

export class CandidaturaRepository {
  constructor(private repo: Repository<Candidatura>) {}

  async criar(data: Partial<Candidatura>) {
    return this.repo.save(this.repo.create(data));
  }

  async listar() {
    return this.repo.find({
      relations: ["aluno", "vaga"],
    });
  }

  async buscarPorId(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ["aluno", "vaga"],
    });
  }

  async buscarPorAluno(alunoId: number) {
    return this.repo.find({
      where: { aluno: { id: alunoId } },
      relations: ["aluno", "vaga"],
    });
  }

  async buscarPorVaga(vagaId: number) {
    return this.repo.find({
      where: { vaga: { id: vagaId } },
      relations: ["aluno", "vaga"],
    });
  }

  async buscarPorAlunoEVaga(alunoId: number, vagaId: number) {
    return this.repo.findOne({
      where: {
        aluno: { id: alunoId },
        vaga: { id: vagaId },
      },
    });
  }

  async atualizar(id: number, data: Partial<Candidatura>) {
    await this.repo.update(id, data);
    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    return this.repo.delete(id);
  }
}