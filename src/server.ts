import "reflect-metadata";
import "dotenv/config";

import express, {
  NextFunction,
  Request,
  Response,
} from "express";

import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import AppError from "./utils/AppError";
import { ZodError } from "zod";
import { AppDataSource } from "./database/data-source";
import { swaggerSpec } from "./docs/swagger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.json());

app.use(routes);

const handleErrorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  console.error("=================================");
  console.error("ERRO CAPTURADO:");
  console.error(error);
  console.error("=================================");

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      issues: error.format(),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "Erro",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
};

app.use(handleErrorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.info(
      "Database connection is ready"
    );

    app.listen(
      Number(PORT),
      () => {
        console.log(
          `Server is running on port ${PORT}`
        );
      }
    );
  })
  .catch((err) => {
    console.error(
      "Falha na conexão TypeORM:",
      err
    );

    process.exit(1);
  });