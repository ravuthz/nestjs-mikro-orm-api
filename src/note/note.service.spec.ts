import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { SharedModule } from '../shared/shared.module';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteModule } from './note.module';
import { NoteService } from './note.service';

const { arrayContaining, objectContaining } = expect;

describe('NoteService', () => {
  let note: Note;
  let service: NoteService;

  const createNote = { name: 'demo 1' };
  const updateNote = { name: 'demo 2' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule.init({ testing: true }), NoteModule],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a single note', async () => {
    const body = new CreateNoteDto(createNote);
    note = await service.create(body);
    expect(note).toMatchObject(createNote);
  });

  it('should list all notes', async () => {
    const result = await service.findAll(new PageOptionsDto());
    expect(result.items).toEqual(
      arrayContaining([objectContaining(createNote)]),
    );
  });

  it('should get a single note', async () => {
    const result = await service.findOne(note.id);
    expect(result).toMatchObject(createNote);
  });

  it('should update a single note', async () => {
    const body = new UpdateNoteDto(updateNote);
    const result = await service.update(note.id, body);
    expect(result).toMatchObject(updateNote);
  });

  it('should delete a single note', async () => {
    const result = await service.remove(note.id);
    expect(result).toBeTruthy();
  });
});
