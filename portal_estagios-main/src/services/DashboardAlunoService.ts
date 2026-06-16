import { CandidaturaRepository } from "../repositories/CandidaturaRepository";

export class DashboardAlunoService {
  constructor(private candidaturaRepo: CandidaturaRepository) {}

  async getDashboard(alunoId: number) {
    const candidaturas =
      await this.candidaturaRepo.buscarPorAluno(alunoId);

    const lista = candidaturas ?? [];

    const total = lista.length;

    const pendentes = lista.filter(
      (c) => c.status === "PENDENTE"
    ).length;

    const aprovadas = lista.filter(
      (c) => c.status === "APROVADO"
    ).length;

    const reprovadas = lista.filter(
      (c) => c.status === "REPROVADO"
    ).length;

    return {
      resumo: {
        total,
        pendentes,
        aprovadas,
        reprovadas,
      },
      candidaturas: lista,
    };
  }
}