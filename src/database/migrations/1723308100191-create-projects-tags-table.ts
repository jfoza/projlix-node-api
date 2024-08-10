import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlMigrationFile } from '@/database/utils';

export class CreateProjectsTagsTable1723308100191
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryUp: string = readSqlMigrationFile(
      '1723308100191-create-projects-tags-table.sql',
    );

    await queryRunner.query(queryUp);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
