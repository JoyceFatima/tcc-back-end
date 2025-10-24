import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGoals1761264829564 implements MigrationInterface {
    name = 'CreateGoals1761264829564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`goals\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`target\` float NOT NULL, \`current\` float NOT NULL DEFAULT '0', \`unit\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`businessId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_921b44baccfc85f7a9ae05df27f\` FOREIGN KEY (\`businessId\`) REFERENCES \`business\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_921b44baccfc85f7a9ae05df27f\``);
        await queryRunner.query(`DROP TABLE \`goals\``);
    }

}
