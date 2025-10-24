import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableRemoveUnique1761266538230 implements MigrationInterface {
    name = 'UserTableRemoveUnique1761266538230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_af99afb7cf88ce20aff6977e68\` ON \`users\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_af99afb7cf88ce20aff6977e68\` ON \`users\` (\`lastName\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\` (\`name\`)`);
    }

}
