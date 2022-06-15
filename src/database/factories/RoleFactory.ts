import { Factory, Faker } from '@mikro-orm/seeder';
import { Role } from '../../role/entities/role.entity';

export class RoleFactory extends Factory<Role> {
  model = Role;

  definition(faker: Faker): Partial<Role> {
    return {
      name: faker.name.findName(),
      note: faker.name.findName(),
    };
  }
}
