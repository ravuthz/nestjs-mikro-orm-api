import { MikroORM } from '@mikro-orm/core';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseSeeder } from '../database/seeders/DatabaseSeeder';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { SharedModule } from '../shared/shared.module';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteController } from './note.controller';
import { NoteModule } from './note.module';

describe('NoteController', () => {
  let app: INestApplication;
  let orm: MikroORM;
  let controller: NoteController;

  let note: Note = null;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), NoteModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    orm = app.get<MikroORM>(MikroORM);
    controller = app.get<NoteController>(NoteController);

    const generator = orm.getSchemaGenerator();
    await generator.ensureDatabase();
    await generator.dropSchema();
    await generator.createSchema();

    const seeder = orm.getSeeder();
    await seeder.seed(DatabaseSeeder);
  });

  afterAll(async () => {
    await orm.close();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a note after created successfully to database', async () => {
    const body = new CreateNoteDto({
      name: 'demo note 1',
      note: 'demo note 1',
    });

    note = await controller.create(body);
    expect(note).toBeTruthy();
  });

  it('should return an array of notes from database', async () => {
    expect(await controller.findAll(new PageOptionsDto())).toBeTruthy();
  });

  it('should return a single note from database', async () => {
    expect(await controller.findOne(note.id)).toBeTruthy();
  });

  it('should return a note after updated successfully to database', async () => {
    const body = new UpdateNoteDto({
      name: 'demo note 2',
      note: 'demo note 2',
    });
    expect(await controller.update('' + note.id, body)).toBeTruthy();
  });

  it('should return empty note after deleted successfully from database', async () => {
    expect(await controller.remove('' + note.id)).toBeTruthy();
  });
});
