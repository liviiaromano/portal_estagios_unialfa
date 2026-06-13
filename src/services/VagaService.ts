import { VagaRepository } from "../repositories/VagaRepository";

export class VagaService {
  constructor(private repo: VagaRepository) {}

  criar(data: any) {
    return this.repo.criar(data);
  }

  listar() {
    return this.repo.listar();
  }

  buscarPorId(id: number) {
    return this.repo.buscarPorId(id);
  }

  atualizar(id: number, data: any) {
    return this.repo.atualizar(id, data);
  }

  deletar(id: number) {
    return this.repo.deletar(id);
  }
}