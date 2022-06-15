import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../../user/entities/user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: '$2b$16$lkHfKXVIzdV1zvM.ar2MmuQmdgpN0d4TzCfqrZceVScXiG1fWbEny',
    };
  }
}
