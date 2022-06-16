import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../shared/utils/auth';
import { toUserDto } from '../shared/utils/mappers';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';
import { UserDto } from './dto/user-dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async register(userDto: RegisterUserDto): Promise<User> {
    userDto.password = await encryptPassword(userDto.password);
    return await this.usersService.create(userDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByLogin(loginUserDto);
    return this.jwtCreateToken(user);
  }

  async refresh(user: User): Promise<any> {
    // return this.generateToken(user);
    return this.jwtCreateToken(user);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload({
      username: payload.username,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  generateToken(payload: JwtPayload | User | UserDto): string {
    const { id, email, username } = payload;
    // JWT encode (id, email, username) to (token)
    return this.jwtService.sign({ id, email, username });
  }

  async validateToken(token: string): Promise<boolean | never> {
    // JWT decode (token) to (id, email, username)
    const decoded: JwtPayload = this.jwtService.verify(token);
    if (!decoded) {
      throw new ForbiddenException('Invalid token');
    }
    await this.validateUser(decoded);
    return true;
  }

  private jwtCreateToken(user: User): any {
    return {
      user: toUserDto(user),
      expiresIn: process.env.EXPIRES_IN,
      accessToken: this.generateToken(user),
    };
  }
}
