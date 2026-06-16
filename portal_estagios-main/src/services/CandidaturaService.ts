import { CandidaturaRepository } from "../repositories/CandidaturaRepository";
import { NotificacaoRepository } from "../repositories/NotificacaoRepository";
import AppError from "../utils/AppError";

export class CandidaturaService {
  constructor(
    private repo: CandidaturaRepository,
    private notificacaoRepo: NotificacaoRepository
  ) {}

  async criar(aluno: any, vaga: any) {
    const jaExiste = await this.repo.buscarPorAlunoEVaga(
      aluno.id,
      vaga.id
    );

    if (jaExiste) {
      throw new AppError("Você já se candidatou para essa vaga", 400);
    }

    const candidatura = await this.repo.criar({
      aluno,
      vaga,
      status: "PENDENTE",
    });

    return candidatura;
  }

  async listar() {
    return this.repo.listar();
  }

  async buscarPorId(id: number) {
    return this.repo.buscarPorId(id);
  }

  async buscarPorAluno(alunoId: number) {
    return this.repo.buscarPorAluno(alunoId);
  }

  async buscarPorVaga(vagaId: number) {
    return this.repo.buscarPorVaga(vagaId);
  }

 async atualizarStatus(id: number, status: string) {
  const candidatura = await this.repo.atualizar(id, { status });

  if (!candidatura) {
    throw new AppError("Candidatura não encontrada", 404);
  }

  await this.notificacaoRepo.criar({
    mensagem: `Sua candidatura foi ${status}`,
    aluno: candidatura.aluno,
  });

  return candidatura;
}

  async deletar(id: number) {
    return this.repo.deletar(id);
  }
}