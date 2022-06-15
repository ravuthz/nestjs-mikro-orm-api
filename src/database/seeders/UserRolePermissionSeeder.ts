import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PermissionFactory } from '../factories/PermissionFactory';
import { RoleFactory } from '../factories/RoleFactory';
import { UserFactory } from '../factories/UserFactory';

export class UserRolePermissionSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Create 4 permissions to 2 different roles for a single user
    // const permissions: Permission[] = new PermissionFactory(em).each(permission => {
    //   permission.roles.set(new RoleFactory(em).each(role => {
    //     role.users.set(new UserFactory(em).make(1));
    //   }).make(2));
    // }).make(4);
    // console.log(permissions);

    const users = new UserFactory(em)
      .each((user) => {
        user.roles.set(
          new RoleFactory(em)
            .each((role) => {
              role.permissions.set(new PermissionFactory(em).make(4));
            })
            .make(1),
        );
      })
      .make(2);
    console.log('Seeding users: ', users);
  }
}
