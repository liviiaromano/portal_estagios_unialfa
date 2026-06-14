import { VagaRepository } from "../repositories/VagaRepository";
import AppError from "../utils/AppError";

export class VagaService {
  constructor(private repo: VagaRepository) {}

  async criar(data: any) {
    if (!data.empresa?.id) {
      throw new AppError(
        "Empresa é obrigatória",
        400
      );
    }

    return this.repo.criar(data);
  }

  listar() {
    return this.repo.listar();
  }

  async buscarPorId(id: number) {
    const vaga =
      await this.repo.buscarPorId(id);

    if (!vaga) {
      throw new AppError(
        "Vaga não encontrada",
        404
      );
    }

    return vaga;
  }

  async atualizar(
    id: number,
    data: any
  ) {
    const vaga =
      await this.repo.buscarPorId(id);

    if (!vaga) {
      throw new AppError(
        "Vaga não encontrada",
        404
      );
    }

    await this.repo.atualizar(
      id,
      data
    );

    return this.repo.buscarPorId(id);
  }

  async deletar(id: number) {
    const vaga =
      await this.repo.buscarPorId(id);

    if (!vaga) {
      throw new AppError(
        "Vaga não encontrada",
        404
      );
    }

    return this.repo.deletar(id);
  }
}