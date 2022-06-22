import { UserDto } from '../../auth/dto/user-dto';
import { User } from '../../user/entities/user.entity';

export const toUserDto = async (data: User): Promise<UserDto> => {
  const { id, email, username, firstName, lastName, profileImage } = data;
  return {
    id,
    email,
    username,
    firstName,
    lastName,
    profileImage,
    // roleNames: await data?.getAllRoleNames(),
    // permissionNames: await data?.getAllPermissionNames(),
  };
};
