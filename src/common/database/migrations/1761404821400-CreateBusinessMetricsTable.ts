import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBusinessMetricsTable1761404821400 implements MigrationInterface {
    name = 'CreateBusinessMetricsTable1761404821400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`business_metrics\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`change\` varchar(255) NOT NULL, \`trend\` varchar(50) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`business_id\` varchar(255) NOT NULL, INDEX \`IDX_0f8961807bb38909ca2b5dc071\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`business_metrics\` ADD CONSTRAINT \`FK_6f1833b2b444268acbacde05595\` FOREIGN KEY (\`business_id\`) REFERENCES \`business\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_metrics\` DROP FOREIGN KEY \`FK_6f1833b2b444268acbacde05595\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f8961807bb38909ca2b5dc071\` ON \`business_metrics\``);
        await queryRunner.query(`DROP TABLE \`business_metrics\``);
    }

}
