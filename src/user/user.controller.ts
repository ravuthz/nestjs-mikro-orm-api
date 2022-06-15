import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   extends BaseCrudController<
  //   User,
  //   CreateUserDto,
  //   UpdateUserDto
  // >
  // constructor(
  //   @InjectRepository(User)
  //   private readonly repository: EntityRepository<User>,
  // ) {
  //   super(new BaseCrudService<User>(repository));
  // }

  @Post()
  create(@Body() createRoleDto: CreateUserDto) {
    return this.userService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() query: PageOptionsDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateUserDto) {
    return this.userService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
