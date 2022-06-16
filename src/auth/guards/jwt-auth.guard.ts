import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import { RequestUser } from '../request-user.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const { user }: RequestUser = context.switchToHttp().getRequest();
    return !!user;
  }

  handleRequest(err: unknown, user: User): any {
    return user;
  }
}
