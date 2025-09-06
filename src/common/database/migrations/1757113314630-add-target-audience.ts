import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTargetAudience1757113314630 implements MigrationInterface {
    name = 'AddTargetAudience1757113314630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`target_audience\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_42643e6174348e6a571ef95c11\` (\`deleted_at\`), UNIQUE INDEX \`IDX_e7dd9534dbaeb8b84e077859ec\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e7dd9534dbaeb8b84e077859ec\` ON \`target_audience\``);
        await queryRunner.query(`DROP INDEX \`IDX_42643e6174348e6a571ef95c11\` ON \`target_audience\``);
        await queryRunner.query(`DROP TABLE \`target_audience\``);
    }

}
