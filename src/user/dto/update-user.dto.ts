import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Optional()
  @IsString()
  password?: string;

  constructor(partial: Partial<UpdateUserDto> = {}) {
    super();
    Object.assign(this, partial);
  }
}
