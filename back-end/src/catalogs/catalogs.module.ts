import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from './catalog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])
  ],
  controllers: [CatalogsController],
  providers: [CatalogsService]
})
export class CatalogsModule {}
