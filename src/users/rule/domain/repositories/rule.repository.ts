import { IRuleRepository } from '@/users/rule/interfaces/repositories/rule.repository.interface';
import { Injectable } from '@nestjs/common';
import { IRuleEntity } from '@/users/rule/interfaces/entities/rule.entity.interface';
import { GetUserRulesRoutine } from '@/users/rule/routines/get-user-rules.routine';

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
