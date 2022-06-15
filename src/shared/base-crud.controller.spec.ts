import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { BaseCrudController } from './base-crud.controller';
import { BaseCrudService } from './base-crud.service';
import { BaseEntity } from './entities/base.entity';

describe('BaseCrudController', () => {
  let controller: BaseCrudController<BaseEntity, any, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([])],
      controllers: [BaseCrudController],
      providers: [EntityRepository, BaseCrudService],
    }).compile();

    controller =
      module.get<BaseCrudController<BaseEntity, any, any>>(BaseCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
