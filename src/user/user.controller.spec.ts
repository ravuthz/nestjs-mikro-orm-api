import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './user.controller';
import { UserModule } from './user.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
