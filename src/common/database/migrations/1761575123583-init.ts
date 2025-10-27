import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761575123583 implements MigrationInterface {
    name = 'Init1761575123583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, "change" character varying(255) NOT NULL, "trend" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "business_id" uuid NOT NULL, CONSTRAINT "PK_0e0b099eef5add99fc9467bc5fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0f8961807bb38909ca2b5dc071" ON "business_metrics" ("deleted_at") `);
        await queryRunner.query(`CREATE TABLE "business_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_3380c75b13b1e097e3285cc8d08" UNIQUE ("name"), CONSTRAINT "PK_dcc57dda934350221e1ff807bfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1abe69fb80f3c8ef7b9c682180" ON "business_type" ("deleted_at") `);
        await queryRunner.query(`CREATE TABLE "target_audience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e7dd9534dbaeb8b84e077859ece" UNIQUE ("name"), CONSTRAINT "PK_eed73d77ed8934ebd8b7b9fae34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42643e6174348e6a571ef95c11" ON "target_audience" ("deleted_at") `);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('master', 'employer')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."roles_name_enum" NOT NULL, "description" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7fd0c79dc4e6083ddea850ac38" ON "roles" ("deleted_at") `);
        await queryRunner.query(`CREATE TABLE "users_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "role_id" uuid, CONSTRAINT "PK_a2cecd1a3531c0b041e29ba46e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "phone" character varying NOT NULL, "document" character varying NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_c1b20b2a1883ed106c3e746c25a" UNIQUE ("document"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_073999dfec9d14522f0cf58cd6" ON "users" ("deleted_at") `);
        await queryRunner.query(`CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(2000) NOT NULL, "address" character varying(500) NOT NULL, "budget" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "owner_id" uuid NOT NULL, "business_type_id" uuid NOT NULL, "target_audience_id" uuid NOT NULL, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_148e9cdda6c563bde156ef1b19" ON "business" ("deleted_at") `);
        await queryRunner.query(`CREATE TABLE "goals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "target" double precision NOT NULL, "current" double precision NOT NULL DEFAULT '0', "isCompleted" boolean NOT NULL DEFAULT false, "metric_id" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "businessId" uuid, CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dashboards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stats" jsonb NOT NULL, "locationAnalysis" jsonb NOT NULL, "insights" jsonb NOT NULL, "businessId" uuid, CONSTRAINT "REL_130465c765b6d7b619c344f324" UNIQUE ("businessId"), CONSTRAINT "PK_1b4b4bc346118e0d335f16c5344" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business_metrics" ADD CONSTRAINT "FK_6f1833b2b444268acbacde05595" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_role" ADD CONSTRAINT "FK_dff1fd3973cc325e58d8b1f5007" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_role" ADD CONSTRAINT "FK_e3a658640780bef5ec4319c8a0f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business" ADD CONSTRAINT "FK_da374bf24a4b84a4aa36dfd3e76" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business" ADD CONSTRAINT "FK_b9b47f8b0aa21535057e61a876f" FOREIGN KEY ("business_type_id") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business" ADD CONSTRAINT "FK_7b125a3f206400b9edfe8441e3e" FOREIGN KEY ("target_audience_id") REFERENCES "target_audience"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goals" ADD CONSTRAINT "FK_921b44baccfc85f7a9ae05df27f" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goals" ADD CONSTRAINT "FK_96df24815a7ed863cd6f872aced" FOREIGN KEY ("metric_id") REFERENCES "business_metrics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dashboards" ADD CONSTRAINT "FK_130465c765b6d7b619c344f324a" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dashboards" DROP CONSTRAINT "FK_130465c765b6d7b619c344f324a"`);
        await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_96df24815a7ed863cd6f872aced"`);
        await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_921b44baccfc85f7a9ae05df27f"`);
        await queryRunner.query(`ALTER TABLE "business" DROP CONSTRAINT "FK_7b125a3f206400b9edfe8441e3e"`);
        await queryRunner.query(`ALTER TABLE "business" DROP CONSTRAINT "FK_b9b47f8b0aa21535057e61a876f"`);
        await queryRunner.query(`ALTER TABLE "business" DROP CONSTRAINT "FK_da374bf24a4b84a4aa36dfd3e76"`);
        await queryRunner.query(`ALTER TABLE "users_role" DROP CONSTRAINT "FK_e3a658640780bef5ec4319c8a0f"`);
        await queryRunner.query(`ALTER TABLE "users_role" DROP CONSTRAINT "FK_dff1fd3973cc325e58d8b1f5007"`);
        await queryRunner.query(`ALTER TABLE "business_metrics" DROP CONSTRAINT "FK_6f1833b2b444268acbacde05595"`);
        await queryRunner.query(`DROP TABLE "dashboards"`);
        await queryRunner.query(`DROP TABLE "goals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_148e9cdda6c563bde156ef1b19"`);
        await queryRunner.query(`DROP TABLE "business"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_073999dfec9d14522f0cf58cd6"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "users_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fd0c79dc4e6083ddea850ac38"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42643e6174348e6a571ef95c11"`);
        await queryRunner.query(`DROP TABLE "target_audience"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1abe69fb80f3c8ef7b9c682180"`);
        await queryRunner.query(`DROP TABLE "business_type"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f8961807bb38909ca2b5dc071"`);
        await queryRunner.query(`DROP TABLE "business_metrics"`);
    }

}
