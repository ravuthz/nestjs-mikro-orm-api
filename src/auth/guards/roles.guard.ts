import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../auth.constants';
import { RequestUser } from '../request-user.interface';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const requiredRoles = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user }: RequestUser = context.switchToHttp().getRequest();
    const roles = await user.getAllRoleNames();
    return requiredRoles.some((role) => roles.includes(role));
  }
}
