import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalog.dto';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Post()
  create(@Body() dto: CreateCatalogDto) {
    return this.catalogsService.create(dto);
  }

  @Get()
  findAll() {
    return this.catalogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCatalogDto) {
    return this.catalogsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogsService.remove(id);
  }
}
