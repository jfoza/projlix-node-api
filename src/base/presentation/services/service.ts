import { Policy } from '@/acl/types/policy';

export class Service {
  private policy: Policy;

  setPolicy(policy: Policy) {
    this.policy = policy;
  }

  getPolicy(): Policy {
    return this.policy;
  }
}
