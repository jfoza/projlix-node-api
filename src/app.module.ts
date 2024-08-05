import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/modules/database.module';
import { UserModule } from '@/users/user/modules/user.module';
import { AdminUserModule } from '@/users/admin-user/modules/admin-user.module';
import { ProfileModule } from '@/users/profiles/modules/profiles.module';
import { AppController } from '@/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AdminUserModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
