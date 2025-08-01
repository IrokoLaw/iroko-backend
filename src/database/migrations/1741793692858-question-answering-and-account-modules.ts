import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionAnsweringAndAccountModules1741793692858
  implements MigrationInterface
{
  name = 'QuestionAnsweringAndAccountModules1741793692858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."source_bloc_enum" AS ENUM('REGLEMENTAIRE', 'LEGISLATIF', 'COMMUNAUTAIRE', 'ACTES')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."source_status_enum" AS ENUM('ABROGE', 'EN VIGUEUR', 'MODIFIE(EN VIGUEUR)')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."source_legaltexttype_enum" AS ENUM('LOI', 'ORDONNANCE', 'DECRET', 'ARRETE', 'JURISPRUDENCE', 'TRAITE OHADA', 'DOCTRINE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."source_action_enum" AS ENUM('PRECISION', 'MODIFICATION', 'MISE EN APPLICATION', 'RAS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "source" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "legalTextName" character varying, "bloc" "public"."source_bloc_enum", "status" "public"."source_status_enum", "legalTextType" "public"."source_legaltexttype_enum", "action" "public"."source_action_enum", "book" character varying, "title" character varying, "titleNumber" character varying, "chapter" character varying, "chapterNumber" character varying, "section" character varying, "sectionNumber" character varying, "articleNumber" character varying, "pathDoc" character varying, "pathMetadata" character varying, "chatId" uuid NOT NULL, CONSTRAINT "PK_018c433f8264b58c86363eaadde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_currency_enum" AS ENUM('XOF', 'XAF')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('SUCCESS', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_method_enum" AS ENUM('CARD', 'MTN', 'MOOV', 'ORANGE', 'WAVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "currency" "public"."transactions_currency_enum" NOT NULL, "country" character varying(4) NOT NULL, "status" "public"."transactions_status_enum" NOT NULL, "cardId" uuid NOT NULL, "operationId" character varying(150) NOT NULL, "method" "public"."transactions_method_enum" NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_7fa5309d34c8f5862367d205a3e" UNIQUE ("operationId"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cards_brand_enum" AS ENUM('VISA', 'MASTERCARD')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cards_status_enum" AS ENUM('ACTIVATED', 'EXPIRED', 'SUSPENDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brand" "public"."cards_brand_enum" NOT NULL DEFAULT 'VISA', "token" character varying NOT NULL, "numberLast4" character varying(4) NOT NULL, "expMonth" integer NOT NULL, "expYear" integer NOT NULL, "holderName" character varying NOT NULL, "status" "public"."cards_status_enum" NOT NULL DEFAULT 'ACTIVATED', "isPrincipal" boolean NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_388db22f1d7d0f93abe68aebb67" UNIQUE ("token"), CONSTRAINT "UQ_ee41de8314518750f40d8e8d600" UNIQUE ("numberLast4"), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."accounts_type_enum" AS ENUM('SOLO', 'ENTERPRISE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."accounts_invoicingtype_enum" AS ENUM('MONTHLY', 'ANNUAL', 'TRY')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."accounts_status_enum" AS ENUM('ACTIVATED', 'INACTIVATED', 'PENDING_PAYMENT', 'ARCHIVED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."accounts_type_enum" NOT NULL DEFAULT 'SOLO', "invoicingType" "public"."accounts_invoicingtype_enum" NOT NULL DEFAULT 'TRY', "expirePaymentDate" TIMESTAMP WITH TIME ZONE NOT NULL, "capacity" integer NOT NULL, "status" "public"."accounts_status_enum" NOT NULL DEFAULT 'ACTIVATED', CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_account_associations_role_enum" AS ENUM('MEMBER', 'OWNER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_account_associations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "accountId" uuid NOT NULL, "role" "public"."user_account_associations_role_enum" NOT NULL, CONSTRAINT "PK_7b61f73256b7f0172043edf8e07" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_userrole_enum" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "externalUserId" character varying NOT NULL, "userRole" "public"."users_userrole_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1dfabb9e55d16f4d37037166485" UNIQUE ("externalUserId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "discussion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_b93169eb129e530c6a4c3b9fda1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."evaluation_note_enum" AS ENUM('BAD', 'USEFUL', 'GREAT', 'NOT_SATISFIED', 'SATISFIED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "note" "public"."evaluation_note_enum" NOT NULL, "comment" text DEFAULT '', "chatId" uuid NOT NULL, CONSTRAINT "REL_e1f94a9cd0142bcd53d73554ca" UNIQUE ("chatId"), CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."chats_documenttypes_enum" AS ENUM('CONSTITUTION', 'DECREES', 'TREATIES', 'ORDERS', 'LAWS', 'JURISPRUDENCE', 'ORDINANCES', 'CIRCULARS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."chats_legalsubjects_enum" AS ENUM('labor_law', 'all')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "question" text NOT NULL, "answer" text NOT NULL, "documentTypes" "public"."chats_documenttypes_enum" array, "legalSubjects" "public"."chats_legalsubjects_enum" array, "discussionId" uuid NOT NULL, "evaluationId" uuid, CONSTRAINT "REL_8f5b25eec64568e4e87dc7646f" UNIQUE ("evaluationId"), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "source" ADD CONSTRAINT "FK_d8ab2d4bfb1c716b6b567bb6953" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_d1dac70b33bf7a903782df5b637" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_associations" ADD CONSTRAINT "FK_dd19fc1e84bd7acbcd39230b094" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_associations" ADD CONSTRAINT "FK_a430de6a3c67425b1321a28c851" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD CONSTRAINT "FK_46cd2bce5e4070e584cac333d2c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD CONSTRAINT "FK_e1f94a9cd0142bcd53d73554ca2" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_651427eea8b5fa81c39b124c6e8" FOREIGN KEY ("discussionId") REFERENCES "discussion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_8f5b25eec64568e4e87dc7646f3" FOREIGN KEY ("evaluationId") REFERENCES "evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_8f5b25eec64568e4e87dc7646f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_651427eea8b5fa81c39b124c6e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" DROP CONSTRAINT "FK_e1f94a9cd0142bcd53d73554ca2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "discussion" DROP CONSTRAINT "FK_46cd2bce5e4070e584cac333d2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_associations" DROP CONSTRAINT "FK_a430de6a3c67425b1321a28c851"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_associations" DROP CONSTRAINT "FK_dd19fc1e84bd7acbcd39230b094"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_d1dac70b33bf7a903782df5b637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "source" DROP CONSTRAINT "FK_d8ab2d4bfb1c716b6b567bb6953"`,
    );
    await queryRunner.query(`DROP TABLE "chats"`);
    await queryRunner.query(`DROP TYPE "public"."chats_legalsubjects_enum"`);
    await queryRunner.query(`DROP TYPE "public"."chats_documenttypes_enum"`);
    await queryRunner.query(`DROP TABLE "evaluation"`);
    await queryRunner.query(`DROP TYPE "public"."evaluation_note_enum"`);
    await queryRunner.query(`DROP TABLE "discussion"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_userrole_enum"`);
    await queryRunner.query(`DROP TABLE "user_account_associations"`);
    await queryRunner.query(
      `DROP TYPE "public"."user_account_associations_role_enum"`,
    );
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_invoicingtype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_type_enum"`);
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`DROP TYPE "public"."cards_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cards_brand_enum"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_method_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_currency_enum"`);
    await queryRunner.query(`DROP TABLE "source"`);
    await queryRunner.query(`DROP TYPE "public"."source_action_enum"`);
    await queryRunner.query(`DROP TYPE "public"."source_legaltexttype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."source_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."source_bloc_enum"`);
  }
}
