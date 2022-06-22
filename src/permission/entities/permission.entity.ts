import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity({ tableName: 'permissions' })
export class Permission extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  // @ManyToMany(() => Role, 'permissions') // (role) => role.permissions
  // roles = new Collection<Role>(this);

  constructor(name: string, note: string) {
    super();
    this.name = name;
    this.note = note;
  }

  static makePermission(model, action) {
    const name = `${model}:${action}`.toLowerCase();
    const note = `Generate ${action} for ${model} by system`;
    return new Permission(name, note);
  }

  static makeCrudFor(model) {
    return [
      Permission.makePermission(model, 'create'),
      Permission.makePermission(model, 'read'),
      Permission.makePermission(model, 'update'),
      Permission.makePermission(model, 'delete'),
    ];
  }
}
