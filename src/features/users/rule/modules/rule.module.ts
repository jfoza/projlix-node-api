import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleEntity } from '@/features/users/rule/domain/entities/rule.entity';
import { ProfileModule } from '@/features/users/profiles/modules/profiles.module';
import { GetUserRulesRoutine } from '@/features/users/rule/routines/get-user-rules.routine';
import { RuleRepository } from '@/features/users/rule/domain/repositories/rule.repository';

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
