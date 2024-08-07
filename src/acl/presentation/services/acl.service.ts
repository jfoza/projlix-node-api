import { Injectable } from '@nestjs/common';
import { Policy } from '@/acl/types/policy';

@Injectable()
export class AclService {
  handle(): Policy {
    const rules = ['RULE_1', 'RULE_2'];

    return new Policy(rules);
  }
}
