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
import { AuthGuard } from '@nestjs/passport';
import { toUserDto } from '../shared/utils/mappers';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';
import { UserDto } from './dto/user-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  public async refresh(@Req() request: any): Promise<string | never> {
    const user: User = request.user;
    return this.authService.refresh(user);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<UserDto> {
    return toUserDto(req.user);
  }
}
