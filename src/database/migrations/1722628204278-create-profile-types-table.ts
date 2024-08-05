import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlMigrationFile } from '../utils';

export class CreateProfileTypesTable1722628204278
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryUp: string = readSqlMigrationFile(
      '1722628204278-create-profile-types-table.sql',
    );

    await queryRunner.query(queryUp);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
