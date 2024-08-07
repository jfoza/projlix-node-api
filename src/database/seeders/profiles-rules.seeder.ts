import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { readSqlSeederFile } from '../utils';

export class ProfilesRulesSeeder implements Seeder {
  track: boolean;

  async run(dataSource: DataSource): Promise<any> {
    const queryUp: string = readSqlSeederFile('profiles-rules.sql');

    await dataSource.query(queryUp);
  }
}
