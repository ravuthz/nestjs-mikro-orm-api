import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { NoteSeeder } from './NoteSeeder';
import { UserRolePermissionSeeder } from './UserRolePermissionSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [NoteSeeder, UserRolePermissionSeeder]);
  }
}
