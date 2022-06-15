import { PageOptionsDto } from './dto/page-options.dto';
import { PageResponseDto } from './dto/page-response.dto';

export interface IBaseCrud<
  EntityType,
  CreateDto,
  UpdateDto,
  QueryDto extends PageOptionsDto,
> {
  findAll(
    query: QueryDto,
  ): Promise<EntityType[]> | Promise<PageResponseDto<unknown>>;

  findOne(id: string | number): Promise<EntityType>;

  create(createDto: CreateDto): Promise<EntityType>;

  update(id: string | number, updateDto: UpdateDto): Promise<EntityType>;

  remove(id: string | number): Promise<EntityType | object>;
}
