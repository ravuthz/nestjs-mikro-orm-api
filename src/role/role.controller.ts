import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../shared/base-crud.controller';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController extends BaseCrudController<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  PageOptionsDto
>(CreateRoleDto, UpdateRoleDto, PageOptionsDto) {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
