import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '@/users/profiles/modules/profiles.module';
import { RuleEntity } from '@/users/rule/domain/entities/rule.entity';
import { RuleRepository } from '@/users/rule/domain/repositories/rule.repository';
import { GetUserRulesRoutine } from '@/users/rule/routines/get-user-rules.routine';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([RuleEntity]),
    forwardRef(() => ProfileModule),
  ],
  providers: [
    GetUserRulesRoutine,
    RuleRepository,
    {
      provide: 'IRuleRepository',
      useExisting: RuleRepository,
    },
  ],
  exports: ['IRuleRepository'],
})
export class RuleModule {}
