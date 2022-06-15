import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity';
import { NoteRepository } from '../note.repository';

@Entity()
export class Note extends BaseEntity {
  [EntityRepositoryType]?: NoteRepository;

  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  constructor(partial: Partial<Note> = {}) {
    super();
    Object.assign(this, partial);
  }
}
