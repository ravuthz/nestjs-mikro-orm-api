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

  @ManyToMany(() => Role)
  roles = new Collection<Role>(this);

  @Property({ persist: false })
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }

  async getAllRoleNames() {
    await this.roles.init();
    const roles = this.roles.getItems();
    const names = roles?.map((item) => item.name);
    console.log(`${this.username} getAllRoleNames:`, names);
    return names;
  }

  async getAllPermissionNames() {
    await this.roles.init();

    let permissions = [];
    for (const role of this.roles.getItems()) {
      await role.permissions.init();
      permissions = [...permissions, ...role.permissions.getItems()];
    }
    const names = permissions.map((item) => item.name);
    console.log(`${this.username} getAllPermissionNames:`, names);
    return names;
  }
}
