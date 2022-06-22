import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { MockerService } from '../shared/mocker.service';
import { SharedModule } from '../shared/shared.module';
import { arrayContaining, objectContaining } from '../shared/utils/test';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleController } from './role.controller';
import { role, roles } from './role.mock';
import { RoleModule } from './role.module';
import { RoleService } from './role.service';

describe('RoleController', () => {
  let controller: RoleController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), RoleModule],
      controllers: [RoleController],
    })
      .overrideProvider(RoleService)
      .useValue(new MockerService(roles))
      .compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all roles', async () => {
    const query = new PageOptionsDto();
    const results = await controller.findAll(query);
    expect(results.items).toEqual(arrayContaining([objectContaining(role)]));
  });

  it('should get a single role', async () => {
    const result = await controller.findOne(role.id);
    expect(result).toMatchObject(role);
  });

  it('should create a single role', async () => {
    const body = new CreateRoleDto(role);
    expect(await controller.create(body)).toMatchObject(role);
  });

  it('should update a single role', async () => {
    const body = new UpdateRoleDto(role);
    const result = await controller.update(role.id, body);
    expect(result).toBe(role);
  });

  it('should delete a single role', async () => {
    const result = await controller.remove(role.id);
    expect(result).toBeTruthy();
  });
});
