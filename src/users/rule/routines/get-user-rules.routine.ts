import { IRuleEntity } from '@/users/rule/interfaces/entities/rule.entity.interface';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserRulesRoutine {
  private userId: string;

  constructor(private readonly dataSource: DataSource) {}

  getUserId(): string {
    return this.userId;
  }

  setUserId(value: string): this {
    this.userId = value;

    return this;
  }

  async run(): Promise<IRuleEntity[]> {
    const query = `SELECT description, subject, action FROM user_conf.get_user_rules($1)`;

    return await this.dataSource.query(query, [this.getUserId()]);
  }
}
