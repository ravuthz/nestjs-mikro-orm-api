import { UserDto } from '../../auth/dto/user-dto';
import { User } from '../../user/entities/user.entity';

export const toUserDto = (data: User): UserDto => {
  const { id, email, username, firstName, lastName, profileImage } = data;
  return { id, email, username, firstName, lastName, profileImage };
};
