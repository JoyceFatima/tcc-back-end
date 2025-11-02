import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBashboard1762099395059 implements MigrationInterface {
    name = 'FixBashboard1762099395059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dashboards" DROP CONSTRAINT "FK_130465c765b6d7b619c344f324a"`);
        await queryRunner.query(`ALTER TABLE "dashboards" DROP CONSTRAINT "REL_130465c765b6d7b619c344f324"`);
        await queryRunner.query(`ALTER TABLE "dashboards" ADD CONSTRAINT "FK_130465c765b6d7b619c344f324a" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dashboards" DROP CONSTRAINT "FK_130465c765b6d7b619c344f324a"`);
        await queryRunner.query(`ALTER TABLE "dashboards" ADD CONSTRAINT "REL_130465c765b6d7b619c344f324" UNIQUE ("businessId")`);
        await queryRunner.query(`ALTER TABLE "dashboards" ADD CONSTRAINT "FK_130465c765b6d7b619c344f324a" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
