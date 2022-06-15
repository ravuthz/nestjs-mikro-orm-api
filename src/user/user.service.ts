import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseCrudService<User> {
  constructor(
    @InjectRepository(User)
    readonly repository: EntityRepository<User>,
  ) {
    super(repository);
  }
}
