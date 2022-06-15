import { PageOptionsDto } from './dto/page-options.dto';

export interface IBaseCrud<T> {
  findAll(query: PageOptionsDto);

  findOne(id: any);

  create(createDto: any);

  update(id: number, updateDto: any);

  remove(id: number);
}
