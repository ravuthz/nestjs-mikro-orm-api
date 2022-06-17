import { UserDto } from './user-dto';

export class TokenDto {
  user: Promise<UserDto> | UserDto;
  scope?: string;
  tokenType?: string = 'Bearer';
  expiresIn: string;
  accessToken: string;
  refreshToken?: string;
}
