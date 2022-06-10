import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

@Module({
  imports: [MikroOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
})
export class NoteModule {}
