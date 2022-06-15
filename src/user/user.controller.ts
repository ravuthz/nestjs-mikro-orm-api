import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../shared/base-crud.controller';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends BaseCrudController<
  User,
  CreateUserDto,
  UpdateUserDto,
  PageOptionsDto
>(CreateUserDto, UpdateUserDto, PageOptionsDto) {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
