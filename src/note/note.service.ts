import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { PageResponseDto } from '../shared/dto/page-response.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  private logger = new Logger(NoteService.name);
  constructor(
    @Inject('NoteRepository')
    private readonly repository: NoteRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const item = new Note(createNoteDto);
    await this.repository.persistAndFlush(item);
    return item;
  }

  async findAll(query: PageOptionsDto) {
    this.logger.debug(JSON.stringify(query || {}, null, 2));
    const results = await this.repository.findAndCount({}, query.toOptions());
    return new PageResponseDto(results, query);
  }

  async findOne(id: number) {
    return await this.repository.findOneOrFail(id);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const item = await this.findOne(id);
    Object.assign(item, updateNoteDto);
    await this.repository.persistAndFlush(item);
    return item;
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repository.removeAndFlush(item);
    return {};
  }
}
