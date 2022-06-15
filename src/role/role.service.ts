import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseCrudService<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  PageOptionsDto
> {
  constructor(
    @InjectRepository(Role)
    readonly repository: EntityRepository<Role>,
  ) {
    super(repository);
  }
}
