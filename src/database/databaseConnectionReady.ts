import { AppDataSource } from "./data-source";

/**
 * Promise que resolve quando o TypeORM terminou `initialize()`.
 * Use `.then()` no `server` para montar rotas e `listen` só com o banco pronto.
 */
export const databaseConnectionReady = AppDataSource.initialize();
