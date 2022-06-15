import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { BaseCrudService } from '../shared/base-crud.service';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService extends BaseCrudService<Permission> {
  constructor(
    @InjectRepository(Permission)
    readonly repository: EntityRepository<Permission>,
  ) {
    super(repository);
  }
}
