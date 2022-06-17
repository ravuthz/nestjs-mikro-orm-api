import { PartialType } from '@nestjs/mapped-types';
import { User } from '../../user/entities/user.entity';

export class UserDto extends PartialType(User) {
  roleNames?: string[];
  permissionNames?: string[];
}
