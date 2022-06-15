import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseCrudService<Role> {
  constructor(
    @InjectRepository(Role)
    readonly repository: EntityRepository<Role>,
  ) {
    super(repository);
  }
}
