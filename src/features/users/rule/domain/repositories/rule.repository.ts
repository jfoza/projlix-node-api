import { Injectable } from '@nestjs/common';
import { IRuleRepository } from '@/features/users/rule/interfaces/repositories/rule.repository.interface';
import { GetUserRulesRoutine } from '@/features/users/rule/routines/get-user-rules.routine';
import { IRuleEntity } from '@/features/users/rule/interfaces/entities/rule.entity.interface';

@Injectable()
export class RuleRepository implements IRuleRepository {
  constructor(private readonly getUserRulesRoutine: GetUserRulesRoutine) {}

  async findAllByUserId(userId: string): Promise<IRuleEntity[]> {
    return await this.getUserRulesRoutine.setUserId(userId).run();
  }

  async getUserRuleDescriptions(userId: string): Promise<string[]> {
    const results: IRuleEntity[] = await this.getUserRulesRoutine
      .setUserId(userId)
      .run();

    return results.map((result: { description: string }) => result.description);
  }
}
