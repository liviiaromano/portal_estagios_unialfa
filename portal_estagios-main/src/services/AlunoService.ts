import { hash } from "bcrypt";
import { AlunoRepository } from "../repositories/AlunoRepository";
import AppError from "../utils/AppError";

const SALT = 8;

export class AlunoService {
  constructor(
    private repo: AlunoRepository
  ) {}

  async criar(data: any) {
    const jaExiste =
      await this.repo.buscarPorEmail(
        data.email
      );

    if (jaExiste) {
      throw new AppError(
        "Email já cadastrado",
        400
      );
    }

    const senhaHash =
      await hash(data.senha, SALT);

    return this.repo.criar({
      ...data,
      senha: senhaHash,
    });
  }

  listar() {
    return this.repo.listar();
  }

  async buscarPorId(id: number) {
    const aluno =
      await this.repo.buscarPorId(id);

    if (!aluno) {
      throw new AppError(
        "Aluno não encontrado",
        404
      );
    }

    return aluno;
  }

  async atualizar(
    id: number,
    data: any
  ) {
    if (data.senha) {
      data.senha =
        await hash(
          data.senha,
          SALT
        );
    }

    return this.repo.atualizar(
      id,
      data
    );
  }

  deletar(id: number) {
    return this.repo.deletar(id);
  }

  async marcarApto(
    id: number
  ) {
    return this.repo.atualizar(
      id,
      {
        aptoEstagio: true,
      }
    );
  }

  async marcarInapto(
    id: number
  ) {
    return this.repo.atualizar(
      id,
      {
        aptoEstagio: false,
      }
    );
  }
}