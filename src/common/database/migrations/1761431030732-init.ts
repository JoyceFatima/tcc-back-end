import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761431030732 implements MigrationInterface {
    name = 'Init1761431030732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`name\` enum ('master', 'employer') NOT NULL, \`description\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_7fd0c79dc4e6083ddea850ac38\` (\`deleted_at\`), UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_role\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NULL, \`role_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`document\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_073999dfec9d14522f0cf58cd6\` (\`deleted_at\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), UNIQUE INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_1abe69fb80f3c8ef7b9c682180\` (\`deleted_at\`), UNIQUE INDEX \`IDX_3380c75b13b1e097e3285cc8d0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goals\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`target\` float NOT NULL, \`current\` float NOT NULL DEFAULT '0', \`isCompleted\` tinyint NOT NULL DEFAULT 0, \`metric_id\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`businessId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`target_audience\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, INDEX \`IDX_42643e6174348e6a571ef95c11\` (\`deleted_at\`), UNIQUE INDEX \`IDX_e7dd9534dbaeb8b84e077859ec\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(2000) NOT NULL, \`address\` varchar(500) NOT NULL, \`budget\` decimal(10,2) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`owner_id\` varchar(255) NOT NULL, \`business_type_id\` varchar(255) NOT NULL, \`target_audience_id\` varchar(255) NOT NULL, INDEX \`IDX_148e9cdda6c563bde156ef1b19\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_metrics\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`change\` varchar(255) NOT NULL, \`trend\` varchar(50) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`business_id\` varchar(255) NOT NULL, INDEX \`IDX_0f8961807bb38909ca2b5dc071\` (\`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dashboards\` (\`id\` varchar(36) NOT NULL, \`stats\` json NOT NULL, \`locationAnalysis\` json NOT NULL, \`insights\` json NOT NULL, \`businessId\` varchar(36) NULL, UNIQUE INDEX \`REL_130465c765b6d7b619c344f324\` (\`businessId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_role\` ADD CONSTRAINT \`FK_dff1fd3973cc325e58d8b1f5007\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_role\` ADD CONSTRAINT \`FK_e3a658640780bef5ec4319c8a0f\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_921b44baccfc85f7a9ae05df27f\` FOREIGN KEY (\`businessId\`) REFERENCES \`business\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_96df24815a7ed863cd6f872aced\` FOREIGN KEY (\`metric_id\`) REFERENCES \`business_metrics\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_da374bf24a4b84a4aa36dfd3e76\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_b9b47f8b0aa21535057e61a876f\` FOREIGN KEY (\`business_type_id\`) REFERENCES \`business_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business\` ADD CONSTRAINT \`FK_7b125a3f206400b9edfe8441e3e\` FOREIGN KEY (\`target_audience_id\`) REFERENCES \`target_audience\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business_metrics\` ADD CONSTRAINT \`FK_6f1833b2b444268acbacde05595\` FOREIGN KEY (\`business_id\`) REFERENCES \`business\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dashboards\` ADD CONSTRAINT \`FK_130465c765b6d7b619c344f324a\` FOREIGN KEY (\`businessId\`) REFERENCES \`business\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dashboards\` DROP FOREIGN KEY \`FK_130465c765b6d7b619c344f324a\``);
        await queryRunner.query(`ALTER TABLE \`business_metrics\` DROP FOREIGN KEY \`FK_6f1833b2b444268acbacde05595\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_7b125a3f206400b9edfe8441e3e\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_b9b47f8b0aa21535057e61a876f\``);
        await queryRunner.query(`ALTER TABLE \`business\` DROP FOREIGN KEY \`FK_da374bf24a4b84a4aa36dfd3e76\``);
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_96df24815a7ed863cd6f872aced\``);
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_921b44baccfc85f7a9ae05df27f\``);
        await queryRunner.query(`ALTER TABLE \`users_role\` DROP FOREIGN KEY \`FK_e3a658640780bef5ec4319c8a0f\``);
        await queryRunner.query(`ALTER TABLE \`users_role\` DROP FOREIGN KEY \`FK_dff1fd3973cc325e58d8b1f5007\``);
        await queryRunner.query(`DROP INDEX \`REL_130465c765b6d7b619c344f324\` ON \`dashboards\``);
        await queryRunner.query(`DROP TABLE \`dashboards\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f8961807bb38909ca2b5dc071\` ON \`business_metrics\``);
        await queryRunner.query(`DROP TABLE \`business_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_148e9cdda6c563bde156ef1b19\` ON \`business\``);
        await queryRunner.query(`DROP TABLE \`business\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7dd9534dbaeb8b84e077859ec\` ON \`target_audience\``);
        await queryRunner.query(`DROP INDEX \`IDX_42643e6174348e6a571ef95c11\` ON \`target_audience\``);
        await queryRunner.query(`DROP TABLE \`target_audience\``);
        await queryRunner.query(`DROP TABLE \`goals\``);
        await queryRunner.query(`DROP INDEX \`IDX_3380c75b13b1e097e3285cc8d0\` ON \`business_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_1abe69fb80f3c8ef7b9c682180\` ON \`business_type\``);
        await queryRunner.query(`DROP TABLE \`business_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_073999dfec9d14522f0cf58cd6\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`users_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_7fd0c79dc4e6083ddea850ac38\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
