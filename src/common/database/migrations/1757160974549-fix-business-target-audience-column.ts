import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBusinessTargetAudienceColumn1757160974549 implements MigrationInterface {
    name = 'FixBusinessTargetAudienceColumn1757160974549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_7b125a3f206400b9edfe8441e3e\``);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_7b125a3f206400b9edfe8441e3e\` FOREIGN KEY (\`target_audience_id\`) REFERENCES \`target_audience\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_7b125a3f206400b9edfe8441e3e\``);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_7b125a3f206400b9edfe8441e3e\` FOREIGN KEY (\`target_audience_id\`) REFERENCES \`business_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
