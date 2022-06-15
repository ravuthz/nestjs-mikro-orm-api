import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { PermissionController } from './permission.controller';
import { PermissionModule } from './permission.module';

describe('PermissionController', () => {
  let controller: PermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, PermissionModule],
    }).compile();

    controller = module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
