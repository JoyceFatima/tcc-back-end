import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGoals1761265270614 implements MigrationInterface {
    name = 'UpdateGoals1761265270614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` DROP COLUMN \`unit\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` ADD \`unit\` varchar(255) NOT NULL`);
    }

}
