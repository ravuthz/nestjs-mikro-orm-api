import { EntityRepository } from '@mikro-orm/core';
import { Note } from './entities/note.entity';

export class NoteRepository extends EntityRepository<Note> {}
