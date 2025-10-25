import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixGoals1761411122102 implements MigrationInterface {
  name = 'FixGoals1761411122102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_goals_metric_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_96df24815a7ed863cd6f872aced\` FOREIGN KEY (\`metric_id\`) REFERENCES \`business_metrics\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_96df24815a7ed863cd6f872aced\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_goals_metric_id\` FOREIGN KEY (\`metric_id\`) REFERENCES \`business_metrics\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
