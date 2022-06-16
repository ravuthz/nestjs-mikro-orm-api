import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Logger } from '@nestjs/common';
import { encryptPassword } from '../../shared/utils/auth';
import { User } from '../../user/entities/user.entity';
import { PermissionFactory } from '../factories/PermissionFactory';
import { RoleFactory } from '../factories/RoleFactory';
import { UserFactory } from '../factories/UserFactory';

export class UserRolePermissionSeeder extends Seeder {
  private readonly logger = new Logger(UserRolePermissionSeeder.name);

  async run(em: EntityManager): Promise<void> {
    // Create 4 permissions to 2 different roles for a single user
    // const permissions: Permission[] = new PermissionFactory(em).each(permission => {
    //   permission.roles.set(new RoleFactory(em).each(role => {
    //     role.users.set(new UserFactory(em).make(1));
    //   }).make(2));
    // }).make(4);
    // console.log(permissions);

    const password = await encryptPassword('123123');

    const users = new UserFactory(em)
      .each((user) => {
        user.password = password;
        user.roles.set(
          new RoleFactory(em)
            .each((role) => {
              role.permissions.set(new PermissionFactory(em).make(4));
            })
            .make(1),
        );
      })
      .make(2);

    const user1 = em.create(User, {
      firstName: 'Admin',
      lastName: 'Mr',
      email: 'adminz@gmail.com',
      username: 'adminz',
      password,
    });

    const user2 = em.create(User, {
      firstName: 'Ravuth',
      lastName: 'Mr',
      email: 'ravuthz@gmail.com',
      username: 'ravuthz',
      password,
    });

    const user3 = em.create(User, {
      firstName: 'User',
      lastName: 'Mr',
      email: 'ravuthz+1@gmail.com',
      username: 'user',
      password,
    });

    const user4 = em.create(User, {
      firstName: 'Visitor',
      lastName: 'Mr',
      email: 'ravuthz+2@gmail.com',
      username: 'visitor',
      password,
    });

    const user5 = em.create(User, {
      firstName: 'Editor',
      lastName: 'Mr',
      email: 'ravuthz+3@gmail.com',
      username: 'editor',
      password,
    });

    this.logger.debug('Seeding user ...', {
      user1,
      user2,
      user3,
      user4,
      user5,
      users,
    });
  }
}
