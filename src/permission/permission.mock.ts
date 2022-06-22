import { Permission } from './entities/permission.entity';

const permissions: Permission[] = [
  new Permission('DEMO_CREATE', 'DEMO_CREATE'),
  new Permission('DEMO_UPDATE', 'DEMO_UPDATE'),
];

const permission = permissions[0];

export { permissions, permission };
