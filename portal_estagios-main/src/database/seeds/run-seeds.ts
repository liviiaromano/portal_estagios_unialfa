import "reflect-metadata";
import "dotenv/config";

import { hash } from "bcrypt";

import { AppDataSource } from "../data-source";

import { Aluno } from "../../models/Aluno";
import { Empresa } from "../../models/Empresa";
import { Vaga } from "../../models/Vaga";
import { Candidatura } from "../../models/Candidatura";
import { Notificacao } from "../../models/Notificacao";

async function runSeed() {
  console.log("🌱 Iniciando seed...");

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const alunoRepo =
    AppDataSource.getRepository(Aluno);

  const empresaRepo =
    AppDataSource.getRepository(Empresa);

  const vagaRepo =
    AppDataSource.getRepository(Vaga);

  const candidaturaRepo =
    AppDataSource.getRepository(Candidatura);

  const notificacaoRepo =
    AppDataSource.getRepository(Notificacao);

  console.log("🧹 Limpando banco...");

  await AppDataSource.query(
    "SET FOREIGN_KEY_CHECKS = 0"
  );

  await candidaturaRepo.clear();
  await notificacaoRepo.clear();
  await vagaRepo.clear();
  await empresaRepo.clear();
  await alunoRepo.clear();

  await AppDataSource.query(
    "SET FOREIGN_KEY_CHECKS = 1"
  );

  const senhaHash = await hash(
    "123456",
    8
  );

  console.log("👤 Criando aluno...");

  const aluno = await alunoRepo.save({
    nome: "João Silva",
    email: "joao@email.com",
    senha: senhaHash,
    curso: "Engenharia de Software",
    aptoEstagio: true,
  });

  console.log("🏢 Criando empresa...");

  const empresa =
    await empresaRepo.save({
      nome: "Tech Solutions LTDA",
      cnpj: "12.345.678/0001-99",
      email: "contato@tech.com",
      senha: senhaHash,
      telefone: "11999999999",
      status: "APROVADA",
    });

  console.log("💼 Criando vagas...");

  const vaga1 = await vagaRepo.save({
    titulo:
      "Estágio Backend Node.js",
    descricao:
      "Trabalhar com APIs e TypeORM",
    local: "Remoto",
    salario: 1500,
    empresa,
  });

  const vaga2 = await vagaRepo.save({
    titulo:
      "Estágio Frontend React",
    descricao:
      "Desenvolvimento de interfaces web",
    local: "São Paulo",
    salario: 1400,
    empresa,
  });

  console.log(
    "📩 Criando candidatura..."
  );

  await candidaturaRepo.save({
    aluno,
    vaga: vaga1,
    status: "PENDENTE",
  });

  console.log(
    "🔔 Criando notificação..."
  );

  await notificacaoRepo.save({
    aluno,
    mensagem: `Sua candidatura para ${vaga1.titulo} foi recebida!`,
    lida: false,
  });

  console.log(
    "✅ Seed finalizado com sucesso!"
  );

  process.exit(0);
}

runSeed().catch((err) => {
  console.error(
    "❌ Erro no seed:",
    err
  );

  process.exit(1);
});