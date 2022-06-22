import { Role } from './entities/role.entity';

const roles: Role[] = [new Role('DOME', 'DOME'), new Role('DEMO', 'DEMO')];

const role = roles[0];

export { roles, role };
