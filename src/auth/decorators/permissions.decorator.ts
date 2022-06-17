import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../guards/permissions.guard';

export const Permissions = (...args: string[]) =>
  SetMetadata('permissions', args);

export function HasPermissions(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(PermissionsGuard),
  );
}
