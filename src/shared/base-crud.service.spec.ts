import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { BaseCrudService } from './base-crud.service';
import { BaseEntity } from './entities/base.entity';

describe('BaseCrudService', () => {
  let service: BaseCrudService<BaseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([])],
      providers: [EntityRepository, BaseCrudService],
    }).compile();

    service = module.get<BaseCrudService<BaseEntity>>(BaseCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
