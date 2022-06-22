import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { toUserDto } from '../shared/utils/mappers';
import { AuthService } from './auth.service';
import { HasPermissions } from './decorators/permissions.decorator';
import { HasRoles } from './decorators/roles.decorator';
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';
import { TokenDto } from './dto/token-dto';
import { UserDto } from './dto/user-dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestUser } from './request-user.interface';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserDto> {
    const user = await this.authService.register(registerUserDto);

    if (!user) {
      throw new HttpException('Failed to register', HttpStatus.BAD_REQUEST);
    }

    return toUserDto(user);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<TokenDto> {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  public async refresh(@Req() req: RequestUser): Promise<TokenDto> {
    return this.authService.refresh(req.user);
  }

  @Get('user')
  // @Roles('ADMIN', 'USER')
  // @UseGuards(AuthGuard(), RolesGuard)
  @HasRoles('ADMIN', 'USER')
  public async testAuthUser(@Req() req: RequestUser): Promise<UserDto> {
    return toUserDto(req.user);
  }

  @Get('user-read')
  // @Permissions('USER:READ')
  // @UseGuards(AuthGuard(), PermissionsGuard)
  @HasPermissions('USER:READ')
  public async testAuthUserPermissions(
    @Req() req: RequestUser,
  ): Promise<UserDto> {
    return toUserDto(req.user);
  }

  @Get('admin')
  // @Roles('ADMIN')
  // @UseGuards(AuthGuard(), RolesGuard)
  @HasRoles('ADMIN')
  public async testAuthAdmin(@Req() req: RequestUser): Promise<UserDto> {
    return toUserDto(req.user);
  }

  @Get('admin-read')
  // @Permissions('USER:READ')
  // @UseGuards(AuthGuard(), PermissionsGuard)
  @HasPermissions('USER:READ')
  public async testAuthAdminPermissions(
    @Req() req: RequestUser,
  ): Promise<UserDto> {
    return toUserDto(req.user);
  }
}
