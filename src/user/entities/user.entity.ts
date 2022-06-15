import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  @IsEmail()
  email: string;

  @Property()
  @Unique()
  username: string;

  @Property()
  @Exclude()
  password: string;

  @Property({ nullable: true })
  profileImage?: string;

  @ManyToMany()
  roles: Collection<Role> = new Collection<Role>(this);

  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }
}
