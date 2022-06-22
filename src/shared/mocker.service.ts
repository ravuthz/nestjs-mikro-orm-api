/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyEntity, EntityData, RequiredEntityData } from '@mikro-orm/core';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageResponseDto } from './dto/page-response.dto';

export class MockerService<
  T extends AnyEntity<T>,
  C extends RequiredEntityData<T>,
  U extends EntityData<T>,
  Q extends PageOptionsDto,
> {
  private readonly item: T;

  constructor(private data: T[] = []) {
    this.item = data ? data[0] : null;
  }

  create: Promise<T> | jest.Mock<Promise<T>> = jest.fn((createDto: C) =>
    Promise.resolve(this.item),
  );

  findAll:
    | Promise<PageResponseDto<T>>
    | jest.Mock<Promise<PageResponseDto<T>>> = jest.fn((query: Q) =>
    Promise.resolve(
      new PageResponseDto<T>([this.data, this.data.length], query),
    ),
  );

  findOne: Promise<T> | jest.Mock<Promise<T>> = jest.fn((id: string | number) =>
    Promise.resolve(this.item),
  );

  update: Promise<T> | jest.Mock<Promise<T>> = jest.fn(
    (id: string | number, updateDto: U) => Promise.resolve(this.item),
  );

  remove: Promise<object | T> | jest.Mock<Promise<T>> = jest.fn(
    (id: string | number) => Promise.resolve(this.item),
  );
}
