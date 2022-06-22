import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Logger } from '@nestjs/common';
import { Note } from '../../note/entities/note.entity';
import { NoteFactory } from '../factories/NoteFactory';

export class NoteSeeder extends Seeder {
  private readonly logger = new Logger(NoteSeeder.name);

  async run(em: EntityManager): Promise<void> {
    const factory = new NoteFactory(em);

    const note1 = em.create(Note, {
      name: 'Note 1',
    });

    const note2 = new Note({ name: 'Note 2' });
    em.persist(note2);

    const note3 = await factory.createOne();
    note3.note = `Update note 3 at ${new Date().toISOString()}`;
    await em.merge(note3);

    const notes = await factory.create(6);

    this.logger.debug({
      note1,
      note2,
      note3,
      notes,
    });
  }
}
