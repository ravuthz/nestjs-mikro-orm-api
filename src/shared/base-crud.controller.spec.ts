import { BaseCrudController } from './base-crud.controller';

describe('BaseCrudController', () => {
  // let controller: any;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [MikroOrmModule.forFeature([])],
  //     providers: [EntityRepository, BaseCrudService],
  //   }).compile();
  //   controller = module.get<any>(BaseCrudController);
  // });

  it('should be defined', () => {
    expect(BaseCrudController).toBeDefined();
  });
});
