import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Logger } from '@nestjs/common';
import { Permission } from '../../permission/entities/permission.entity';
import { Role } from '../../role/entities/role.entity';
import { encryptPassword } from '../../shared/utils/auth';
import { User } from '../../user/entities/user.entity';
import { PermissionFactory } from '../factories/PermissionFactory';
import { RoleFactory } from '../factories/RoleFactory';
import { UserFactory } from '../factories/UserFactory';

export class UserRolePermissionSeeder extends Seeder {
  private readonly logger = new Logger(UserRolePermissionSeeder.name);

  private async saveUser(em, data: any) {
    const { password, ...body } = data;
    let user = await em.findOne(User, { ...body });
    if (!user) {
      user = em.create(User, { ...body, password });
    }
    return user;
  }

  async run(em: EntityManager): Promise<void> {
    // Create 4 permissions to 2 different roles for a single user
    // const permissions: Permission[] = new PermissionFactory(em).each(permission => {
    //   permission.roles.set(new RoleFactory(em).each(role => {
    //     role.users.set(new UserFactory(em).make(1));
    //   }).make(2));
    // }).make(4);
    // console.log(permissions);

    const password = await encryptPassword('123123');

    const user1 = await this.saveUser(em, {
      firstName: 'Admin',
      lastName: 'Mr',
      email: 'adminz@gmail.com',
      username: 'adminz',
      password,
    });

    const user2 = await this.saveUser(em, {
      firstName: 'Ravuth',
      lastName: 'Mr',
      email: 'ravuthz@gmail.com',
      username: 'ravuthz',
      password,
    });

    const user3 = await this.saveUser(em, {
      firstName: 'User',
      lastName: 'Mr',
      email: 'ravuthz+1@gmail.com',
      username: 'user',
      password,
    });

    const user4 = await this.saveUser(em, {
      firstName: 'Visitor',
      lastName: 'Mr',
      email: 'ravuthz+2@gmail.com',
      username: 'visitor',
      password,
    });

    const user5 = await this.saveUser(em, {
      firstName: 'Editor',
      lastName: 'Mr',
      email: 'ravuthz+3@gmail.com',
      username: 'editor',
      password,
    });

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

    this.logger.debug('Seeding user ...', {
      user1,
      user2,
      user3,
      user4,
      user5,
      users,
    });

    const userPermissions = this.makeCrudPermissions(em, 'user');
    const rolePermissions = this.makeCrudPermissions(em, 'role');
    const permPermissions = this.makeCrudPermissions(em, 'permission');

    const roleAdmin = em.create(Role, {
      name: 'ADMIN',
      note: 'Generate [Admin] role by system',
    });

    const roleUser = em.create(Role, {
      name: 'USER',
      note: 'Generate [USER] role by system',
    });

    roleAdmin.permissions.set([
      ...userPermissions,
      ...rolePermissions,
      ...permPermissions,
    ]);
    em.persist(roleAdmin);

    roleUser.permissions.set([
      userPermissions[1],
      rolePermissions[1],
      permPermissions[1],
    ]);
    em.persist(roleUser);

    user1.roles.add(roleAdmin);
    em.persist(user1);

    user2.roles.add(roleUser);
    em.persist(user2);

    user3.roles.add(roleUser);
    em.persist(user3);

    user4.roles.add(roleUser);
    em.persist(user4);

    user5.roles.add(roleUser);
    em.persist(user5);
  }

  private makeCrudPermissions(em: EntityManager, model: string) {
    const keys = ['create', 'read', 'update', 'delete'];
    const permissions = [];
    keys.forEach((action: string) => {
      const permission = em.create(Permission, {
        name: `${model}:${action}`.toUpperCase(),
        note: `Generate ${action} for ${model} by system`,
      });
      permissions.push(permission);
    });
    return permissions;
  }
}
