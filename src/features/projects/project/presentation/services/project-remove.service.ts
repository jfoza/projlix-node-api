import { IProjectRemoveService } from '@/features/projects/project/interfaces/services/project-remove.service.interface';
import { Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';

@Injectable()
export class ProjectRemoveService
  extends Service
  implements IProjectRemoveService
{
  handle(projectId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
