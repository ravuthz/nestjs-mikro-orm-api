import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { comparePasswords, encryptPassword } from '../shared/utils/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export class UserRepository extends EntityRepository<User> {}

@Injectable()
export class UserService extends BaseCrudService<
  User,
  CreateUserDto,
  UpdateUserDto,
  PageOptionsDto
> {
  constructor(
    @InjectRepository(User)
    readonly repository: UserRepository,
  ) {
    super(repository);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.isExist(createUserDto);
    createUserDto.password = await encryptPassword(createUserDto.password);
    const item = this.repository.create(createUserDto);
    await this.repository.persistAndFlush(item);
    return item;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const item = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await encryptPassword(updateUserDto.password);
    }
    Object.assign(item, updateUserDto);
    await this.repository.persistAndFlush(item);
    return item;
  }

  async isExist({ email, username }: any) {
    const exists = await this.repository.count({
      $or: [{ email }, { username }],
    });
    if (exists > 0) {
      throw new BadRequestException('The email and username must be unique');
    }
  }

  async findByPayload(payload: any): Promise<User> {
    return await this.repository.findOne(payload);
  }

  async findByLogin({ username, password }: any): Promise<User> {
    const user = await this.findByPayload({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid username or user not found');
    }

    const matchPasswords = await comparePasswords(user.password, password);

    if (!matchPasswords) {
      throw new UnauthorizedException(
        'Invalid credentials (username/password)',
      );
    }

    return user;
  }
}
