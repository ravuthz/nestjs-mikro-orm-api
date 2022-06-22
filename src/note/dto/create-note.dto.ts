import { NameNoteDto } from '../../shared/dto/name-note.dto';

export class CreateNoteDto extends NameNoteDto {
  constructor(partial: Partial<CreateNoteDto> = {}) {
    super(partial);
  }
}
