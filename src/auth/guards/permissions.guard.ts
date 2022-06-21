import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthGuard } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import { PERMISSIONS_KEY } from '../auth.constants';
import { RequestUser } from '../request-user.interface';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class PermissionsGuard extends JwtAuthGuard implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err: unknown, user: User): any {
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const requiredPermissions = this.reflector.getAllAndOverride<any[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user }: RequestUser = context.switchToHttp().getRequest();
    const permissions = await user?.getAllPermissionNames();
    return requiredPermissions.some((role) => permissions.includes(role));
  }
}
