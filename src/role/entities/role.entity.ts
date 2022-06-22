import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity({ tableName: 'roles' })
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  // @ManyToMany(() => User, (user) => user.roles)
  // users = new Collection<User>(this);

  @Exclude()
  @ManyToMany(() => Permission)
  permissions = new Collection<Permission>(this);

  constructor(name: string, note: string) {
    super();
    this.name = name;
    this.note = note;
  }

  // async getAllPermissionNames() {
  //   await this.permissions.init();
  //   return this.permissions.getItems().map((item) => item.name);
  // }
}
