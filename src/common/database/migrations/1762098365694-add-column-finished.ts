import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnFinished1762098365694 implements MigrationInterface {
  name = 'AddColumnFinished1762098365694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dashboards" ADD "finished" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dashboards" DROP COLUMN "finished"`);
  }
}
