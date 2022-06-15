import { Factory, Faker } from '@mikro-orm/seeder';
import { Permission } from '../../permission/entities/permission.entity';

export class PermissionFactory extends Factory<Permission> {
  model = Permission;

  definition(faker: Faker): Partial<Permission> {
    return {
      name: faker.name.findName(),
      note: faker.name.findName(),
    };
  }
}
