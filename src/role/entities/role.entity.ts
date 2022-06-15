import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '../../shared/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ tableName: 'roles' })
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: Collection<User> = new Collection<User>(this);

  @ManyToMany()
  permissions: Collection<Permission> = new Collection<Permission>(this);

  constructor(partial: Partial<Role> = {}) {
    super();
    Object.assign(this, partial);
  }

  async getAllPermissionNames() {
    await this.permissions.init();
    return this.permissions.getItems().map((item) => item.name);
  }
}
