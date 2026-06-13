import { EmpresaRepository } from "../repositories/EmpresaRepository";
import AppError from "../utils/AppError";

export class EmpresaService {
  constructor(private repo: EmpresaRepository) {}

  async criar(data: any) {
    return this.repo.criar(data);
  }

  async listar() {
    return this.repo.listar();
  }

  async buscarPorId(id: number) {
    return this.repo.buscarPorId(id);
  }

  async atualizar(id: number, data: any) {
    return this.repo.atualizar(id, data);
  }

  async deletar(id: number) {
    return this.repo.deletar(id);
  }

  // =========================
  // EXTRAS DO CONTROLLER
  // =========================

  async aprovar(id: number) {
    return this.repo.atualizar(id, { status: "APROVADO" });
  }

  async bloquear(id: number) {
    return this.repo.atualizar(id, { status: "BLOQUEADO" });
  }

  async remover(id: number) {
    return this.repo.deletar(id);
  }
}