import { Test, TestingModule } from '@nestjs/testing';
import { CreatePermissionDto } from '../permission/dto/create-permission.dto';
import { UpdatePermissionDto } from '../permission/dto/update-permission.dto';
import { permission, permissions } from '../permission/permission.mock';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { MockerService } from '../shared/mocker.service';
import { SharedModule } from '../shared/shared.module';
import { arrayContaining, objectContaining } from '../shared/utils/test';
import { PermissionModule } from './permission.module';
import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), PermissionModule],
    })
      .overrideProvider(PermissionService)
      .useValue(new MockerService(permissions))
      .compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should list all permissions', async () => {
    const query = new PageOptionsDto();
    const results = await service.findAll(query);
    expect(results.items).toEqual(
      arrayContaining([objectContaining(permission)]),
    );
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('should get a single permission', async () => {
    const result = await service.findOne(permission.id);
    expect(result).toMatchObject(permission);
    expect(service.findOne).toHaveBeenCalledWith(permission.id);
  });

  it('should create a single permission', async () => {
    const body = new CreatePermissionDto(permission);
    expect(await service.create(body)).toMatchObject(permission);
    expect(service.create).toHaveBeenCalledWith(body);
  });

  it('should update a single permission', async () => {
    const body = new UpdatePermissionDto(permission);
    const result = await service.update(permission.id, body);
    expect(result).toBe(permission);
    expect(service.update).toHaveBeenCalledWith(permission.id, body);
  });

  it('should delete a single permission', async () => {
    const result = await service.remove(permission.id);
    expect(result).toBeTruthy();
    expect(await service.remove).toHaveBeenCalledWith(permission.id);
  });
});
