import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Optional()
  note: string;
}
