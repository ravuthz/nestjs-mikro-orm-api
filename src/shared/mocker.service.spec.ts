import { Test, TestingModule } from '@nestjs/testing';
import { CreateDTO } from './dto/create.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { UpdateDTO } from './dto/update.dto';
import { BaseEntity } from './entities/base.entity';
import { MockerService } from './mocker.service';
describe('MockerService', () => {
  let service: MockerService<BaseEntity, CreateDTO, UpdateDTO, PageOptionsDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockerService],
    }).compile();

    service =
      module.get<
        MockerService<BaseEntity, CreateDTO, UpdateDTO, PageOptionsDto>
      >(MockerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
