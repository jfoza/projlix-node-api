import { runSeeder, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ProfilesRulesSeeder } from './profiles-rules.seeder';

export class DatabaseSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, ProfilesRulesSeeder);
  }
}
