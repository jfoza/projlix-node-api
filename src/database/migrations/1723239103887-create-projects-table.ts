import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlMigrationFile } from '@/database/utils';

export class CreateProjectsTable1723239103887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryUp: string = readSqlMigrationFile(
      '1723239103887-create-projects-table.sql',
    );

    await queryRunner.query(queryUp);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
