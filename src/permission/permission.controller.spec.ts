import { Test, TestingModule } from '@nestjs/testing';
import { CreatePermissionDto } from '../permission/dto/create-permission.dto';
import { UpdatePermissionDto } from '../permission/dto/update-permission.dto';
import { permission, permissions } from '../permission/permission.mock';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { MockerService } from '../shared/mocker.service';
import { SharedModule } from '../shared/shared.module';
import { arrayContaining, objectContaining } from '../shared/utils/test';
import { PermissionController } from './permission.controller';
import { PermissionModule } from './permission.module';
import { PermissionService } from './permission.service';

describe('PermissionController', () => {
  let controller: PermissionController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), PermissionModule],
      controllers: [PermissionController],
    })
      .overrideProvider(PermissionService)
      .useValue(new MockerService(permissions))
      .compile();

    controller = module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all permissions', async () => {
    const query = new PageOptionsDto();
    const results = await controller.findAll(query);
    expect(results.items).toEqual(
      arrayContaining([objectContaining(permission)]),
    );
  });

  it('should get a single permission', async () => {
    const result = await controller.findOne(permission.id);
    expect(result).toMatchObject(permission);
  });

  it('should create a single permission', async () => {
    const body = new CreatePermissionDto(permission);
    expect(await controller.create(body)).toMatchObject(permission);
  });

  it('should update a single permission', async () => {
    const body = new UpdatePermissionDto(permission);
    const result = await controller.update(permission.id, body);
    expect(result).toBe(permission);
  });

  it('should delete a single permission', async () => {
    const result = await controller.remove(permission.id);
    expect(result).toBeTruthy();
  });
});
