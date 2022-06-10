import { Factory, Faker } from '@mikro-orm/seeder';
import { Note } from '../../note/entities/note.entity';

export class NoteFactory extends Factory<Note> {
  model = Note;

  definition(faker: Faker): Partial<Note> {
    return {
      name: faker.word.noun(10),
      note: faker.word.noun(30),
    };
  }
}
