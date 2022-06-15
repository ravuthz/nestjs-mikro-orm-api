import { IsArray, IsObject } from 'class-validator';
import { PageOptionsDto } from './page-options.dto';

export class PageMetaDto {
  readonly page: number;
  readonly size: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPrevPage: boolean;
  readonly hasNextPage: boolean;

  constructor(itemCount: number, query: PageOptionsDto) {
    this.page = query.page;
    this.size = query.size;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.size);
    this.hasPrevPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class PageResponseDto<T> {
  @IsArray()
  readonly items: T[];

  @IsObject()
  readonly pager: PageMetaDto;

  constructor(results: any[], query: PageOptionsDto) {
    this.items = results[0];
    this.pager = new PageMetaDto(results[1], query);
  }
}
