import {
  Request,
  Response,
  NextFunction,
} from "express";

import { CandidaturaService } from "../services/CandidaturaService";
import AppError from "../utils/AppError";

export class CandidaturaController {
  constructor(private service: CandidaturaService) {}

  // =========================
  // CREATE
  // =========================
  criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aluno = req.usuario;

      if (!aluno) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { vaga } = req.body;

      const candidatura = await this.service.criar(aluno, vaga);

      return res.status(201).json(candidatura);
    } catch (error) {
      next(error);
    }
  };

  // =========================
  // LISTAR (ADMIN / DEBUG)
  // =========================
  listar = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.listar();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  // =========================
  // BUSCAR POR ID
  // =========================
  buscar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const candidatura = await this.service.buscarPorId(id);

      return res.json(candidatura);
    } catch (error) {
      next(error);
    }
  };

  // =========================
  // DASHBOARD ALUNO
  // =========================
  dashboardAluno = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aluno = req.usuario;

      if (!aluno) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const data = await this.service.buscarPorAluno(aluno.id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  // =========================
  // BUSCAR POR VAGA (EMPRESA)
  // =========================
  buscarPorVaga = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vagaId = Number(req.params.vagaId);

      const data = await this.service.buscarPorVaga(vagaId);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  // =========================
  // UPDATE STATUS (EMPRESA)
  // =========================
  atualizarStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      const candidatura = await this.service.atualizarStatus(id, status);

      return res.json(candidatura);
    } catch (error) {
      next(error);
    }
  };
}