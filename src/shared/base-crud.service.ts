import { AnyEntity, EntityRepository } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { IBaseCrud } from './base-crud.interface';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageResponseDto } from './dto/page-response.dto';

@Injectable()
export class BaseCrudService<
  T extends AnyEntity<T>,
  C,
  U,
  Q extends PageOptionsDto,
> implements IBaseCrud<T, C, U, Q>
{
  private logger = new Logger(BaseCrudService.name);

  constructor(readonly repository: EntityRepository<T>) {}

  async findAll(query: Q) {
    this.logger.debug(JSON.stringify(query || {}, null, 2));
    const results = await this.repository.findAndCount(null, query.toOptions());
    return new PageResponseDto(results, query);
  }

  async findOne(id: any) {
    return await this.repository.findOneOrFail(id);
  }

  async create(createNoteDto: any) {
    const item = this.repository.create(createNoteDto);
    await this.repository.persistAndFlush(item);
    return item;
  }

  async update(id: number, updateNoteDto: any) {
    const item = await this.findOne(id);
    Object.assign(item, updateNoteDto);
    await this.repository.persistAndFlush(item);
    return item;
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repository.removeAndFlush(item);
    return {};
  }
}
