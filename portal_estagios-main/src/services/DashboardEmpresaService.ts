import { VagaRepository } from "../repositories/VagaRepository";
import { CandidaturaRepository } from "../repositories/CandidaturaRepository";

export class DashboardEmpresaService {
  constructor(
    private vagaRepo: VagaRepository,
    private candidaturaRepo: CandidaturaRepository
  ) {}

  async getDashboard(empresaId: number) {
    const vagas = await this.vagaRepo.listar();

    const vagasEmpresa = vagas.filter(
      (vaga) => vaga.empresa.id === empresaId
    );

    let totalCandidaturas = 0;

    const vagasComCandidaturas = await Promise.all(
      vagasEmpresa.map(async (vaga) => {
        const candidaturas =
          await this.candidaturaRepo.buscarPorVaga(
            vaga.id
          );

        totalCandidaturas += candidaturas.length;

        return {
          vaga,
          totalCandidaturas:
            candidaturas.length,
          candidaturas,
        };
      })
    );

    return {
      resumo: {
        totalVagas:
          vagasEmpresa.length,
        totalCandidaturas,
      },
      vagas: vagasComCandidaturas,
    };
  }
}