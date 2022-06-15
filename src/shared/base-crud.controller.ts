import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseCrudService } from './base-crud.service';
import { PageOptionsDto } from './dto/page-options.dto';
import { BaseEntity } from './entities/base.entity';

@Controller()
export class BaseCrudController<T extends BaseEntity, CreateDTO, UpdateDTO> {
  constructor(private readonly service: BaseCrudService<T>) {}

  @Get()
  findAll(@Query() query: PageOptionsDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public create(@Body() createDto: CreateDTO) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDTO) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
