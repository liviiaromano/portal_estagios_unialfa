import { Repository } from "typeorm";
import { Vaga } from "../models/Vaga";

export class VagaRepository {
  constructor(private repo: Repository<Vaga>) {}

  async criar(data: Partial<Vaga>) {
    return this.repo.save(this.repo.create(data));
  }

  async listar() {
    return this.repo.find({
      relations: ["empresa"],
    });
  }

  async buscarPorId(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ["empresa"],
    });
  }

  async buscarPorEmpresa(empresaId: number) {
    return this.repo.find({
      where: { empresa: { id: empresaId } },
      relations: ["empresa"],
    });
  }

  async atualizar(id: number, data: Partial<Vaga>) {
    await this.repo.update(id, data);
    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    return this.repo.delete(id);
  }
}