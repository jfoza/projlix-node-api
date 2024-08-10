import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class Policy {
  private rules: string[];

  constructor(rules: string[]) {
    this.rules = rules;
  }

  haveRule(rule: string): boolean {
    return this.rules.includes(rule);
  }

  can(rule: string): void {
    if (!this.haveRule(rule)) {
      this.policyException();
    }
  }

  policyException(): void {
    throw new ForbiddenException(ErrorMessagesEnum.NOT_AUTHORIZED);
  }
}
