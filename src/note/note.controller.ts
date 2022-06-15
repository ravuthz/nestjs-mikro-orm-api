import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../shared/base-crud.controller';
import { BaseCrudService } from '../shared/base-crud.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NoteController extends BaseCrudController<
  Note,
  CreateNoteDto,
  UpdateNoteDto
> {
  constructor(
    @InjectRepository(Note)
    private readonly repository: EntityRepository<Note>,
  ) {
    super(new BaseCrudService<Note>(repository));
  }
}
