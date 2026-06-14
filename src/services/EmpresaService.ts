import { hash } from "bcrypt";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import AppError from "../utils/AppError";

const SALT = 8;

export class EmpresaService {
  constructor(private repo: EmpresaRepository) {}

  async criar(data: any) {
    const existe =
      await this.repo.buscarPorCnpj(
        data.cnpj
      );

    if (existe) {
      throw new AppError(
        "Empresa já cadastrada",
        400
      );
    }

    const senhaHash = await hash(
      data.senha,
      SALT
    );

    return this.repo.criar({
      ...data,
      senha: senhaHash,
    });
  }

  listar() {
    return this.repo.listar();
  }

  buscarPorId(id: number) {
    return this.repo.buscarPorId(id);
  }

  async atualizar(
    id: number,
    data: any
  ) {
    if (data.senha) {
      data.senha = await hash(
        data.senha,
        SALT
      );
    }

    return this.repo.atualizar(
      id,
      data
    );
  }

  remover(id: number) {
    return this.repo.deletar(id);
  }

  aprovar(id: number) {
    return this.repo.atualizar(id, {
      status: "APROVADA",
    });
  }

  bloquear(id: number) {
    return this.repo.atualizar(id, {
      status: "BLOQUEADA",
    });
  }
}