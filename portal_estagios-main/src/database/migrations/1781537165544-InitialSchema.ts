import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1781537165544 implements MigrationInterface {
    name = 'InitialSchema1781537165544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alunos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`curso\` varchar(255) NULL, \`aptoEstagio\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_1f9a8f3f4e5a314a2d7f828a60\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empresas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`cnpj\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`telefone\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'PENDENTE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_f5ed71aeb4ef47f95df5f8830b\` (\`cnpj\`), UNIQUE INDEX \`IDX_fe5e0374ec6d7d7dfbe0444690\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vagas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`descricao\` text NOT NULL, \`local\` varchar(255) NOT NULL, \`salario\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`empresa_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidaturas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL DEFAULT 'PENDENTE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`alunoId\` int NULL, \`vagaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notificacoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mensagem\` text NOT NULL, \`lida\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`alunoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vagas\` ADD CONSTRAINT \`FK_d8815ee22200784e3ae124da143\` FOREIGN KEY (\`empresa_id\`) REFERENCES \`empresas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` ADD CONSTRAINT \`FK_1a8b17e64dbe67d674b2b135fa1\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` ADD CONSTRAINT \`FK_b74e588e756926be854b99f3405\` FOREIGN KEY (\`vagaId\`) REFERENCES \`vagas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacoes\` ADD CONSTRAINT \`FK_29aa71247d88589f936b639aae2\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notificacoes\` DROP FOREIGN KEY \`FK_29aa71247d88589f936b639aae2\``);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` DROP FOREIGN KEY \`FK_b74e588e756926be854b99f3405\``);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` DROP FOREIGN KEY \`FK_1a8b17e64dbe67d674b2b135fa1\``);
        await queryRunner.query(`ALTER TABLE \`vagas\` DROP FOREIGN KEY \`FK_d8815ee22200784e3ae124da143\``);
        await queryRunner.query(`DROP TABLE \`notificacoes\``);
        await queryRunner.query(`DROP TABLE \`candidaturas\``);
        await queryRunner.query(`DROP TABLE \`vagas\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe5e0374ec6d7d7dfbe0444690\` ON \`empresas\``);
        await queryRunner.query(`DROP INDEX \`IDX_f5ed71aeb4ef47f95df5f8830b\` ON \`empresas\``);
        await queryRunner.query(`DROP TABLE \`empresas\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f9a8f3f4e5a314a2d7f828a60\` ON \`alunos\``);
        await queryRunner.query(`DROP TABLE \`alunos\``);
    }

}
