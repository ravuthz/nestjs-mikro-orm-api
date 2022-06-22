import { Test, TestingModule } from '@nestjs/testing';
import { role, roles } from '../role/role.mock';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { MockerService } from '../shared/mocker.service';
import { SharedModule } from '../shared/shared.module';
import { arrayContaining, objectContaining } from '../shared/utils/test';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleModule } from './role.module';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), RoleModule],
    })
      .overrideProvider(RoleService)
      .useValue(new MockerService(roles))
      .compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should list all roles', async () => {
    const query = new PageOptionsDto();
    const results = await service.findAll(query);
    expect(results.items).toEqual(arrayContaining([objectContaining(role)]));
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('should get a single role', async () => {
    const result = await service.findOne(role.id);
    expect(result).toMatchObject(role);
    expect(service.findOne).toHaveBeenCalledWith(role.id);
  });

  it('should create a single role', async () => {
    const body = new CreateRoleDto(role);
    expect(await service.create(body)).toMatchObject(role);
    expect(service.create).toHaveBeenCalledWith(body);
  });

  it('should update a single role', async () => {
    const body = new UpdateRoleDto(role);
    const result = await service.update(role.id, body);
    expect(result).toBe(role);
    expect(service.update).toHaveBeenCalledWith(role.id, body);
  });

  it('should delete a single role', async () => {
    const result = await service.remove(role.id);
    expect(result).toBeTruthy();
    expect(await service.remove).toHaveBeenCalledWith(role.id);
  });
});
