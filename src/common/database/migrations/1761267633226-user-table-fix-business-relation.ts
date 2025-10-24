import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableFixBusinessRelation1761267633226 implements MigrationInterface {
    name = 'UserTableFixBusinessRelation1761267633226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_da374bf24a4b84a4aa36dfd3e76\``);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_da374bf24a4b84a4aa36dfd3e76\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_da374bf24a4b84a4aa36dfd3e76\``);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_da374bf24a4b84a4aa36dfd3e76\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
