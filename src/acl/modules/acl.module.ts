import { Global, Module } from '@nestjs/common';
import { AclService } from '../presentation/services/acl.service';

@Global()
@Module({
  providers: [AclService],
  exports: [AclService],
})
export class AclModule {}
