import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import { ROLES_KEY } from '../auth.constants';
import { RequestUser } from '../request-user.interface';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err: unknown, user: User): any {
    return user;
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
    const roles = await user?.getAllRoleNames();
    return requiredRoles.some((role) => roles.includes(role));
  }
}
