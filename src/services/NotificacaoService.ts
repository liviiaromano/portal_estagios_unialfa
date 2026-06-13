import { NotificacaoRepository } from "../repositories/NotificacaoRepository";

export class NotificacaoService {
  constructor(
    private repo: NotificacaoRepository
  ) {}

  async criar(
    aluno: any,
    mensagem: string
  ) {
    return this.repo.criar({
      aluno,
      mensagem,
      lida: false,
    });
  }

  async listarPorAluno(
    alunoId: number
  ) {
    return this.repo.listarPorAluno(
      alunoId
    );
  }

  async marcarComoLida(
    id: number
  ) {
    return this.repo.marcarComoLida(id);
  }

  async buscarPorId(
    id: number
  ) {
    return this.repo.buscarPorId(id);
  }

  async deletar(
    id: number
  ) {
    return this.repo.deletar(id);
  }
}