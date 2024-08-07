import { Provider } from '@nestjs/common';
import { AclService } from '@/acl/presentation/services/acl.service';
import { Policy } from '@/acl/types/policy';

type ServiceClass = new (...args: any[]) => any;

export function createServiceProvider(
  serviceToken: string,
  serviceClass: ServiceClass,
): Provider {
  return {
    provide: serviceToken,
    useFactory: (service: any, aclService: AclService) => {
      const policy: Policy = aclService.handle();
      service.setPolicy(policy);
      return service;
    },
    inject: [serviceClass, AclService],
  };
}
