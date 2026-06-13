import jwt from "jsonwebtoken";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import AppError from "../utils/AppError";
import authConfig from "../config/auth";

export class SessionService {
  constructor(
    private alunoRepo: AlunoRepository,
    private empresaRepo: EmpresaRepository
  ) {}

  async login(email: string, senha: string) {
    const aluno = await this.alunoRepo.buscarPorEmail(email);

    if (aluno && aluno.senha === senha) {
      const token = jwt.sign(
        {
          idUsuario: aluno.id,
          tipo: "ALUNO",
        },
        authConfig.jwt.secret,
        {
          expiresIn: authConfig.jwt.expiresIn,
        }
      );

      return {
        usuario: aluno,
        token,
      };
    }

    const empresa = await this.empresaRepo.buscarPorEmail(email);

    if (empresa && empresa.senha === senha) {
      const token = jwt.sign(
        {
          idUsuario: empresa.id,
          tipo: "EMPRESA",
        },
        authConfig.jwt.secret,
        {
          expiresIn: authConfig.jwt.expiresIn,
        }
      );

      return {
        usuario: empresa,
        token,
      };
    }

    throw new AppError("Email ou senha inválidos", 401);
  }
}