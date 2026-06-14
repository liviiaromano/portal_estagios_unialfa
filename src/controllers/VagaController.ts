import {
  Request,
  Response,
  NextFunction,
} from "express";
import { z } from "zod";
import { VagaService } from "../services/VagaService";
import AppError from "../utils/AppError";

export class VagaController {
  constructor(private service: VagaService) {}

  private readonly schemaCriar = z.object({
    titulo: z.string().min(3),
    descricao: z.string().min(10),
    local: z.string().min(2),
    salario: z.number().nonnegative(),
  });

  private readonly schemaAtualizar = z.object({
    titulo: z.string().min(3).optional(),
    descricao: z.string().min(10).optional(),
    local: z.string().min(2).optional(),
    salario: z.number().nonnegative().optional(),
  });

  criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.schemaCriar.parse(req.body);

      const usuario = req.usuario;

      if (!usuario) {
        throw new AppError("Usuário não autenticado", 401);
      }

      if (usuario.tipo !== "EMPRESA") {
        throw new AppError("Apenas empresa pode criar vagas", 403);
      }

      const vaga = await this.service.criar({
        ...data,
        empresa: {
          id: usuario.id,
        },
      });

      return res.status(201).json(vaga);
    } catch (error) {
      next(error);
    }
  };

  listar = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const vagas = await this.service.listar();
      return res.json(vagas);
    } catch (error) {
      next(error);
    }
  };

  buscar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const vaga = await this.service.buscarPorId(id);
      return res.json(vaga);
    } catch (error) {
      next(error);
    }
  };

  atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = req.usuario;

      if (!usuario || usuario.tipo !== "EMPRESA") {
        throw new AppError("Apenas empresa pode atualizar vagas", 403);
      }

      const id = Number(req.params.id);
      const data = this.schemaAtualizar.parse(req.body);

      const vaga = await this.service.atualizar(id, data);

      return res.json(vaga);
    } catch (error) {
      next(error);
    }
  };

  deletar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = req.usuario;

      if (!usuario || usuario.tipo !== "EMPRESA") {
        throw new AppError("Apenas empresa pode deletar vagas", 403);
      }

      const id = Number(req.params.id);

      await this.service.deletar(id);

      return res.status(200).json({
        message: "Vaga removida com sucesso",
      });
    } catch (error) {
      next(error);
    }
  };
}