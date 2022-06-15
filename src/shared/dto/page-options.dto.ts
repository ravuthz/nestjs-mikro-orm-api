import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly size?: number = 10;

  @IsOptional()
  readonly sort?: object = {};

  @IsOptional()
  readonly sorts?: string[] = [];

  toOptions() {
    this.sorts.forEach((item) => {
      const key = item.replace('-', '');
      this.sort[key] = item.indexOf('-') !== -1 ? Order.DESC : Order.ASC;
    });
    return {
      limit: this.size,
      offset: this.page > 0 ? this.page - 1 : 0,
      orderBy: this.sort || {},
    };
  }
}
