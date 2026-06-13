import { VagaRepository } from "../repositories/VagaRepository";
import { CandidaturaRepository } from "../repositories/CandidaturaRepository";

export class DashboardEmpresaService {
  constructor(
    private vagaRepo: VagaRepository,
    private candidaturaRepo: CandidaturaRepository
  ) {}

  async getDashboard(empresaId: number) {
    const vagas = (await this.vagaRepo.listar()) ?? [];
    const candidaturas = (await this.candidaturaRepo.listar()) ?? [];

    const vagasDaEmpresa = vagas.filter(
      (vaga) => vaga.empresa && vaga.empresa.id === empresaId
    );

    const vagasIds = vagasDaEmpresa.map((v) => v.id);

    const candidaturasDaEmpresa = candidaturas.filter(
      (c) => c.vaga && vagasIds.includes(c.vaga.id)
    );

    const totalVagas = vagasDaEmpresa.length;
    const totalCandidaturas = candidaturasDaEmpresa.length;

    const pendentes = candidaturasDaEmpresa.filter(
      (c) => c.status === "PENDENTE"
    ).length;

    const aprovadas = candidaturasDaEmpresa.filter(
      (c) => c.status === "APROVADO"
    ).length;

    const reprovadas = candidaturasDaEmpresa.filter(
      (c) => c.status === "REPROVADO"
    ).length;

    return {
      resumo: {
        totalVagas,
        totalCandidaturas,
        pendentes,
        aprovadas,
        reprovadas,
      },
      vagas: vagasDaEmpresa,
      candidaturas: candidaturasDaEmpresa,
    };
  }
}