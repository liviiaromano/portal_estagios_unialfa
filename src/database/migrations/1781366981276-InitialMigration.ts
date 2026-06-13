import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1781366981276 implements MigrationInterface {
    name = 'InitialMigration1781366981276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vagas\` DROP FOREIGN KEY \`FK_61e2c2c348c984194644c17d5ab\``);
        await queryRunner.query(`CREATE TABLE \`notificacoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mensagem\` text NOT NULL, \`lida\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`alunoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vagas\` DROP COLUMN \`empresaId\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`aptoEstagio\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`vagas\` ADD \`empresa_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`alunos\` CHANGE \`curso\` \`curso\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vagas\` DROP COLUMN \`salario\``);
        await queryRunner.query(`ALTER TABLE \`vagas\` ADD \`salario\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` DROP FOREIGN KEY \`FK_1a8b17e64dbe67d674b2b135fa1\``);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` DROP FOREIGN KEY \`FK_b74e588e756926be854b99f3405\``);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` CHANGE \`alunoId\` \`alunoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` CHANGE \`vagaId\` \`vagaId\` int NULL`);
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
        await queryRunner.query(`ALTER TABLE \`candidaturas\` CHANGE \`vagaId\` \`vagaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` CHANGE \`alunoId\` \`alunoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` ADD CONSTRAINT \`FK_b74e588e756926be854b99f3405\` FOREIGN KEY (\`vagaId\`) REFERENCES \`vagas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidaturas\` ADD CONSTRAINT \`FK_1a8b17e64dbe67d674b2b135fa1\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vagas\` DROP COLUMN \`salario\``);
        await queryRunner.query(`ALTER TABLE \`vagas\` ADD \`salario\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`alunos\` CHANGE \`curso\` \`curso\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`vagas\` DROP COLUMN \`empresa_id\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`aptoEstagio\``);
        await queryRunner.query(`ALTER TABLE \`vagas\` ADD \`empresaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`notificacoes\``);
        await queryRunner.query(`ALTER TABLE \`vagas\` ADD CONSTRAINT \`FK_61e2c2c348c984194644c17d5ab\` FOREIGN KEY (\`empresaId\`) REFERENCES \`empresas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
