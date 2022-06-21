import { RequiredEntityData } from '@mikro-orm/core';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import { AbstractValidationPipe } from './abstract-validation-pipe.pipe';
import { IBaseCrud } from './base-crud.interface';
import { BaseCrudService } from './base-crud.service';
import { PageOptionsDto } from './dto/page-options.dto';
import { BaseEntity } from './entities/base.entity';

export function BaseCrudController<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends BaseEntity,
  C extends RequiredEntityData<T>,
  U,
  Q extends PageOptionsDto,
>(createDto: Type<C>, updateDto: Type<U>, queryDto: Type<Q>): any {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );
  const queryPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { query: queryDto },
  );
  class BCrudController<
    T extends BaseEntity,
    C extends RequiredEntityData<T>,
    U,
    Q extends PageOptionsDto,
  > implements IBaseCrud<T, C, U, Q>
  {
    constructor(public service: BaseCrudService<T, C, U, Q>) {}

    @Get()
    @UsePipes(queryPipe)
    findAll(@Query() query: Q) {
      return this.service.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.service.findOne(+id);
    }

    @Post()
    @UsePipes(createPipe)
    public create(@Body() createDto: C) {
      return this.service.create(createDto);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    update(@Param('id') id: string, @Body() updateDto: U) {
      return this.service.update(+id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.service.remove(+id);
    }
  }
  return BCrudController;
}
