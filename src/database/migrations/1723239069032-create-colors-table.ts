import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlMigrationFile } from '@/database/utils';

export class CreateColorsTable1723239069032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryUp: string = readSqlMigrationFile(
      '1723239069032-create-colors-table.sql',
    );

    await queryRunner.query(queryUp);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
