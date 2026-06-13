import {
  Request,
  Response,
  NextFunction,
} from "express";
import { z } from "zod";
import { VagaService } from "../services/VagaService";

export class VagaController {
  constructor(
    private service: VagaService
  ) {}

  private readonly schemaCriar =
    z.object({
      titulo: z.string().min(3),
      descricao: z.string().min(10),
      local: z.string().min(2),
      salario: z.number().nonnegative(),

      empresa: z.object({
        id: z.number(),
      }),
    });

  private readonly schemaAtualizar =
    z.object({
      titulo: z.string().min(3).optional(),
      descricao: z.string().min(10).optional(),
      local: z.string().min(2).optional(),
      salario: z.number().nonnegative().optional(),
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

      const vaga =
        await this.service.criar(
          data
        );

      return res.status(201).json(
        vaga
      );
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
      const vagas =
        await this.service.listar();

      return res.json(vagas);
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

      const vaga =
        await this.service.buscarPorId(
          id
        );

      return res.json(vaga);
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

      const vaga =
        await this.service.atualizar(
          id,
          data
        );

      return res.json(vaga);
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
          "Vaga removida com sucesso",
      });
    } catch (error) {
      next(error);
    }
  };
}