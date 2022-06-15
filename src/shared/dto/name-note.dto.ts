import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class NameNoteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Optional()
  note: string;
}
