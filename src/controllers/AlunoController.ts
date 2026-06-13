import {
  Request,
  Response,
  NextFunction,
} from "express";
import { z } from "zod";
import { AlunoService } from "../services/AlunoService";

export class AlunoController {
  constructor(
    private service: AlunoService
  ) {}

  private readonly schemaCriar =
    z.object({
      nome: z.string().min(3),
      email: z.string().email(),
      senha: z.string().min(6),
      curso: z.string().optional(),
    });

  private readonly schemaAtualizar =
    z.object({
      nome: z.string().min(3).optional(),
      email: z.string().email().optional(),
      senha: z.string().min(6).optional(),
      curso: z.string().optional(),
      aptoEstagio: z.boolean().optional(),
    });

  criar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data =
        this.schemaCriar.parse(
          req.body
        );

      const aluno =
        await this.service.criar(
          data
        );

      return res
        .status(201)
        .json(aluno);
    } catch (error) {
      next(error);
    }
  };

  listar = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const alunos =
        await this.service.listar();

      return res.json(alunos);
    } catch (error) {
      next(error);
    }
  };

  buscar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(
        req.params.id
      );

      const aluno =
        await this.service.buscarPorId(
          id
        );

      return res.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  atualizar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(
        req.params.id
      );

      const data =
        this.schemaAtualizar.parse(
          req.body
        );

      const aluno =
        await this.service.atualizar(
          id,
          data
        );

      return res.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  deletar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(
        req.params.id
      );

      await this.service.deletar(id);

      return res.status(200).json({
        message:
          "Aluno removido com sucesso",
      });
    } catch (error) {
      next(error);
    }
  };

  marcarApto = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(
        req.params.id
      );

      const aluno =
        await this.service.marcarApto(
          id
        );

      return res.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  marcarInapto = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(
        req.params.id
      );

      const aluno =
        await this.service.marcarInapto(
          id
        );

      return res.json(aluno);
    } catch (error) {
      next(error);
    }
  };
}