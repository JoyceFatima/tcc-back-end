import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBusiness1757113264619 implements MigrationInterface {
    name = 'AddBusiness1757113264619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`business\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(2000) NOT NULL, \`address\` varchar(500) NOT NULL, \`budget\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_148e9cdda6c563bde156ef1b19\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_1abe69fb80f3c8ef7b9c682180\` (\`deleted_at\`), UNIQUE INDEX \`IDX_3380c75b13b1e097e3285cc8d0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD \`owner_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD \`business_type_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD \`target_audience_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`business\` DROP COLUMN \`budget\``);
        await queryRunner.query(`ALTER TABLE \`business\` ADD \`budget\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_da374bf24a4b84a4aa36dfd3e76\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_b9b47f8b0aa21535057e61a876f\` FOREIGN KEY (\`business_type_id\`) REFERENCES \`business_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_7b125a3f206400b9edfe8441e3e\` FOREIGN KEY (\`target_audience_id\`) REFERENCES \`business_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_7b125a3f206400b9edfe8441e3e\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_b9b47f8b0aa21535057e61a876f\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_da374bf24a4b84a4aa36dfd3e76\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP COLUMN \`budget\``);
        await queryRunner.query(`ALTER TABLE \`business\` ADD \`budget\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`business\` DROP COLUMN \`target_audience_id\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP COLUMN \`business_type_id\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP COLUMN \`owner_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_3380c75b13b1e097e3285cc8d0\` ON \`business_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_1abe69fb80f3c8ef7b9c682180\` ON \`business_type\``);
        await queryRunner.query(`DROP TABLE \`business_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_148e9cdda6c563bde156ef1b19\` ON \`business\``);
        await queryRunner.query(`DROP TABLE \`business\``);
    }

}
