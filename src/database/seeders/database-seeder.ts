import { runSeeder, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ProfilesRulesSeeder } from './profiles-rules.seeder';
import { ColorsSeeder } from '@/database/seeders/colors.seeder';
import { IconsSeeder } from '@/database/seeders/icons.seeder';
import { UsersSeeder } from '@/database/seeders/users.seeder';
import { GeneralDataSeeder } from '@/database/seeders/general-data.seeder';

export class DatabaseSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, ProfilesRulesSeeder);
    await runSeeder(dataSource, ColorsSeeder);
    await runSeeder(dataSource, IconsSeeder);
    await runSeeder(dataSource, UsersSeeder);
    await runSeeder(dataSource, GeneralDataSeeder);
  }
}
