import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { MockerService } from '../shared/mocker.service';
import { SharedModule } from '../shared/shared.module';
import { arrayContaining, objectContaining } from '../shared/utils/test';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user, users } from './user.mock';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), UserModule],
    })
      .overrideProvider(UserService)
      .useValue(new MockerService(users))
      // .useValue(createMockedFunctions(users))
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    // jest.spyOn(service, 'findAll').mockImplementation(async () => users);
    const query = new PageOptionsDto();
    const results = await service.findAll(query);
    expect(results.items).toEqual(arrayContaining([objectContaining(user)]));
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('should get a single user', async () => {
    // jest.spyOn(service, 'findOne').mockImplementation(async () => user);
    const result = await service.findOne(user.id);
    expect(result).toMatchObject(user);
    expect(service.findOne).toHaveBeenCalledWith(user.id);
  });

  it('should create a single user', async () => {
    // jest.spyOn(service, 'create').mockImplementation(async () => user);
    const body = new CreateUserDto(user);
    expect(await service.create(body)).toMatchObject(user);
    expect(service.create).toHaveBeenCalledWith(body);
  });

  it('should update a single user', async () => {
    // jest.spyOn(service, 'update').mockImplementation(async () => user);
    const body = new UpdateUserDto(user);
    const result = await service.update(user.id, body);
    expect(result).toBe(user);
    expect(service.update).toHaveBeenCalledWith(user.id, body);
  });

  it('should delete a single user', async () => {
    // jest.spyOn(service, 'remove').mockImplementation(async () => null);
    const result = await service.remove(user.id);
    expect(result).toBeTruthy();
    expect(await service.remove).toHaveBeenCalledWith(user.id);
  });
});
