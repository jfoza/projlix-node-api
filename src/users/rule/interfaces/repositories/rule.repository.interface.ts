import { IRuleEntity } from '@/users/rule/interfaces/entities/rule.entity.interface';

export interface IRuleRepository {
  findAllByUserId(userId: string): Promise<IRuleEntity[]>;
  getUserRuleDescriptions(userId: string): Promise<string[]>;
}
