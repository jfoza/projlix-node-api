import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class Policy {
  private rules: string[];

  constructor(rules: string[]) {
    this.rules = rules;
  }

  can(ability: string): boolean {
    return this.rules.includes(ability);
  }

  canValidate(ability: string): void {
    if (!this.can(ability)) {
      this.canException();
    }
  }

  canException(): void {
    throw new ForbiddenException(ErrorMessagesEnum.NOT_AUTHORIZED);
  }
}
