import { MigrationInterface, QueryRunner } from "typeorm";

export class UserBusinessRelation1761266292832 implements MigrationInterface {
    name = 'UserBusinessRelation1761266292832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`business_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_cde4b2aabca86cfabdc78b537f0\` FOREIGN KEY (\`business_id\`) REFERENCES \`business\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_cde4b2aabca86cfabdc78b537f0\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`business_id\``);
    }

}
