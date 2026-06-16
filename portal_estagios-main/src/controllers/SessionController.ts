import {
  NextFunction,
  Request,
  Response,
} from "express";

import { z } from "zod";
import type { SessionService } from "../services/SessionService";

export class SessionController {
  constructor(
    private readonly sessionService: SessionService
  ) {}

  private readonly schemaLogin = z.object({
    email: z.string().email({
      message: "E-mail inválido",
    }),

    senha: z.string().min(1, {
      message: "Senha é obrigatória",
    }),
  });

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = this.schemaLogin.parse(req.body);

      const { usuario, token } =
        await this.sessionService.login(
          body.email,
          body.senha
        );

      return res.status(200).json({
        usuario,
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}