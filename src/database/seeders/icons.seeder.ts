import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { readSqlSeederFile } from '@/database/utils';

export class IconsSeeder implements Seeder {
  track: boolean;

  async run(dataSource: DataSource): Promise<any> {
    const queryUp: string = readSqlSeederFile('icons.sql');

    await dataSource.query(queryUp);
  }
}
