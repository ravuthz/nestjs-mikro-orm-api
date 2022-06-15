import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../shared/base-crud.controller';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController extends BaseCrudController<
  Note,
  CreateNoteDto,
  UpdateNoteDto,
  PageOptionsDto
>(CreateNoteDto, UpdateNoteDto, PageOptionsDto) {
  /**
   * Advance CRUD Controller with BaseCrudService & BaseCrudController
   * src/shared/base-crud.service.ts
   * src/shared/base-crud.controller.ts
   * @param service
   */
  constructor(private readonly service: NoteService) {
    super(service);
  }

  /**
   * Advance CRUD Controller with BaseCrudService & BaseCrudController
   * src/shared/base-crud.service.ts
   * src/shared/base-crud.controller.ts
   * @param service inject generic service from BaseCrudService
   */
  // constructor(
  //   @InjectRepository(Note)
  //   private readonly repository: EntityRepository<Note>,
  // ) {
  //   super(
  //     new BaseCrudService<Note, CreateNoteDto, UpdateNoteDto, PageOptionsDto>(
  //       repository,
  //     ),
  //   );
  // }

  /**
   * Basic CRUD Controller
   */

  // @Post()
  // create(@Body() createNoteDto: CreateNoteDto) {
  //   return this.service.create(createNoteDto);
  // }

  // @Get()
  // findAll(@Query() query: PageOptionsDto) {
  //   return this.service.findAll(query);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.service.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UpdateNoteDto: UpdateNoteDto) {
  //   return this.service.update(+id, UpdateNoteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(+id);
  // }
}
