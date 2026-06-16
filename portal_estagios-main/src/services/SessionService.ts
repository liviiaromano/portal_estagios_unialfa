import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

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
    // =========================
    // LOGIN ALUNO
    // =========================
    const aluno = await this.alunoRepo.buscarPorEmail(email);

    if (aluno) {
      const senhaCorreta = await compare(senha, aluno.senha);

      if (senhaCorreta) {
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

        const { senha, ...alunoSemSenha } = aluno;

        return {
          usuario: alunoSemSenha,
          token,
        };
      }
    }

    // =========================
    // LOGIN EMPRESA
    // =========================
    const empresa = await this.empresaRepo.buscarPorEmail(email);

    if (empresa) {
      const senhaCorreta = await compare(senha, empresa.senha);

      if (senhaCorreta) {
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

        const { senha, ...empresaSemSenha } = empresa;

        return {
          usuario: empresaSemSenha,
          token,
        };
      }
    }

    throw new AppError("Email ou senha inválidos", 401);
  }
}