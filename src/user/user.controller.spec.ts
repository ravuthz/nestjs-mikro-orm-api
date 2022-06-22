import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { MockerService } from '../shared/mocker.service';
import { SharedModule } from '../shared/shared.module';
import { arrayContaining, objectContaining } from '../shared/utils/test';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { user, users } from './user.mock';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), UserModule],
      controllers: [UserController],
    })
      .overrideProvider(UserService)
      .useValue(new MockerService(users))
      .compile();

    // const service = module.get<UserService>(UserService);
    // controller = new UserController(service);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all users', async () => {
    const query = new PageOptionsDto();
    const results = await controller.findAll(query);
    expect(results.items).toEqual(arrayContaining([objectContaining(user)]));
  });

  it('should get a single user', async () => {
    const result = await controller.findOne(user.id);
    expect(result).toMatchObject(user);
  });

  it('should create a single user', async () => {
    const body = new CreateUserDto(user);
    expect(await controller.create(body)).toMatchObject(user);
  });

  it('should update a single user', async () => {
    const body = new UpdateUserDto(user);
    const result = await controller.update(user.id, body);
    expect(result).toBe(user);
  });

  it('should delete a single user', async () => {
    const result = await controller.remove(user.id);
    expect(result).toBeTruthy();
  });
});
