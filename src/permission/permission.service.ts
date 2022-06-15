import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService extends BaseCrudService<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  PageOptionsDto
> {
  constructor(
    @InjectRepository(Permission)
    readonly repository: EntityRepository<Permission>,
  ) {
    super(repository);
  }
}
