import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { NoteRepository } from '../note.repository';

@Entity()
export class Note {
  [EntityRepositoryType]?: NoteRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(partial: Partial<Note> = {}) {
    Object.assign(this, partial);
  }
}
