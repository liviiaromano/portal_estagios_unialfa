import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../utils/AppError";

interface TokenPayload {
  idUsuario: number;
  tipo: "ALUNO" | "EMPRESA";
}

declare module "express-serve-static-core" {
  interface Request {
    usuario?: {
      id: number;
      tipo: "ALUNO" | "EMPRESA";
    };
  }
}

export default function autenticacao(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    throw new AppError("Token mal formatado", 401);
  }

  const [, token] = parts;

  try {
    const decoded = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    if (!decoded?.idUsuario || !decoded?.tipo) {
      throw new AppError("Token inválido", 401);
    }

    req.usuario = {
      id: decoded.idUsuario,
      tipo: decoded.tipo,
    };

    return next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}