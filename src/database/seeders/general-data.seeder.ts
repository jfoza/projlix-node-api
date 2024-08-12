import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { readSqlSeederFile } from '@/database/utils';

export class GeneralDataSeeder implements Seeder {
  track: boolean;

  async run(dataSource: DataSource): Promise<any> {
    const queryUp: string = readSqlSeederFile('general-data.sql');

    await dataSource.query(queryUp);
  }
}
