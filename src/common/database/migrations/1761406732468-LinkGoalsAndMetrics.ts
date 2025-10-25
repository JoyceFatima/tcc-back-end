import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkGoalsAndMetrics1761406732468 implements MigrationInterface {
    name = 'LinkGoalsAndMetrics1761406732468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` ADD \`metric_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD UNIQUE INDEX \`IDX_96df24815a7ed863cd6f872ace\` (\`metric_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_96df24815a7ed863cd6f872ace\` ON \`goals\` (\`metric_id\`)`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_96df24815a7ed863cd6f872aced\` FOREIGN KEY (\`metric_id\`) REFERENCES \`business_metrics\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_96df24815a7ed863cd6f872aced\``);
        await queryRunner.query(`DROP INDEX \`REL_96df24815a7ed863cd6f872ace\` ON \`goals\``);
        await queryRunner.query(`ALTER TABLE \`goals\` DROP INDEX \`IDX_96df24815a7ed863cd6f872ace\``);
        await queryRunner.query(`ALTER TABLE \`goals\` DROP COLUMN \`metric_id\``);
    }

}
