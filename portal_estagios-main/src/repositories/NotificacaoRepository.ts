import { Repository } from "typeorm";
import { Notificacao } from "../models/Notificacao";

export class NotificacaoRepository {
  constructor(private repo: Repository<Notificacao>) {}

  async criar(data: Partial<Notificacao>) {
    return this.repo.save(this.repo.create(data));
  }

  async listarPorAluno(alunoId: number) {
    return this.repo.find({
      where: { aluno: { id: alunoId } },
      relations: ["aluno"],
      order: { id: "DESC" },
    });
  }

  async buscarPorId(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ["aluno"],
    });
  }

  async marcarComoLida(id: number) {
    await this.repo.update(id, { lida: true });
    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    return this.repo.delete(id);
  }
}