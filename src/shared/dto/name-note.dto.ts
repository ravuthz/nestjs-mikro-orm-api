import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export abstract class NameNoteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Optional()
  @IsString()
  note?: string;

  constructor(partial: Partial<NameNoteDto> = {}) {
    Object.assign(this, partial);
  }
}
