import { Repository } from "typeorm";
import { Empresa } from "../models/Empresa";

export class EmpresaRepository {
  constructor(private repo: Repository<Empresa>) {}

  async criar(data: Partial<Empresa>) {
    return this.repo.save(this.repo.create(data));
  }

  async listar() {
    return this.repo.find();
  }

  async buscarPorId(id: number) {
    return this.repo.findOneBy({ id });
  }

  async buscarPorEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async buscarPorCnpj(cnpj: string) {
    return this.repo.findOneBy({ cnpj });
  }

  async atualizar(id: number, data: Partial<Empresa>) {
    await this.repo.update(id, data);
    return this.buscarPorId(id);
  }

  async deletar(id: number) {
    return this.repo.delete(id);
  }
}