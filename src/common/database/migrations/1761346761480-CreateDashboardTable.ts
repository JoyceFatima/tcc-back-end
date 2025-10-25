import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDashboardTable1761346761480 implements MigrationInterface {
    name = 'CreateDashboardTable1761346761480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dashboards\` (\`id\` varchar(36) NOT NULL, \`stats\` json NOT NULL, \`locationAnalysis\` json NOT NULL, \`insights\` json NOT NULL, \`businessId\` varchar(36) NULL, UNIQUE INDEX \`REL_130465c765b6d7b619c344f324\` (\`businessId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dashboards\` ADD CONSTRAINT \`FK_130465c765b6d7b619c344f324a\` FOREIGN KEY (\`businessId\`) REFERENCES \`business\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dashboards\` DROP FOREIGN KEY \`FK_130465c765b6d7b619c344f324a\``);
        await queryRunner.query(`DROP INDEX \`REL_130465c765b6d7b619c344f324\` ON \`dashboards\``);
        await queryRunner.query(`DROP TABLE \`dashboards\``);
    }

}
