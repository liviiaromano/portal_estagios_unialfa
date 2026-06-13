import {
  Request,
  Response,
  NextFunction,
} from "express";

import { NotificacaoService } from "../services/NotificacaoService";

export class NotificacaoController {
  constructor(
    private service: NotificacaoService
  ) {}

  listarPorAluno = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const alunoId = Number(
        req.params.id
      );

      const notificacoes =
        await this.service.listarPorAluno(
          alunoId
        );

      return res.json(
        notificacoes
      );
    } catch (error) {
      next(error);
    }
  };

  marcarComoLida = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(
        req.params.id
      );

      const notificacao =
        await this.service.marcarComoLida(
          id
        );

      return res.json(
        notificacao
      );
    } catch (error) {
      next(error);
    }
  };
}