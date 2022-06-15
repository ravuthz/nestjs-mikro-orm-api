import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseCrudService<
  User,
  CreateUserDto,
  UpdateUserDto,
  PageOptionsDto
> {
  constructor(
    @InjectRepository(User)
    readonly repository: EntityRepository<User>,
  ) {
    super(repository);
  }
}
