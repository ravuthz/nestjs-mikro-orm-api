import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [MikroOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [EntityRepository, PermissionService],
})
export class PermissionModule {}
