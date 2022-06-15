import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../shared/base-crud.controller';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController extends BaseCrudController<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
  PageOptionsDto
>(CreatePermissionDto, UpdatePermissionDto, PageOptionsDto) {
  constructor(private readonly permissionService: PermissionService) {
    super(permissionService);
  }
}
