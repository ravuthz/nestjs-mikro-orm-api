import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
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

  @Property({ hidden: true })
  password: string;

  @Property({ nullable: true })
  profileImage?: string;

  @ManyToMany()
  roles: Collection<Role> = new Collection<Role>(this);

  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }

  async getAllRoleNames() {
    await this.roles.init();
    const roles = this.roles.getItems();
    return roles?.map((item) => item.name);
  }

  async getAllPermissionNames() {
    await this.roles.init();

    let permissions = [];
    for (const role of this.roles.getItems()) {
      await role.permissions.init();
      permissions = [...permissions, ...role.permissions.getItems()];
    }
    return permissions.map((item) => item.name);
  }
}
