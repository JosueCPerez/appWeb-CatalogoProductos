import { Injectable, ConflictException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from './catalog.schema';
import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalog.dto';

@Injectable()
export class CatalogsService {

    constructor(@InjectModel(Catalog.name) private catalogModel: Model<Catalog>) {}

    async create(data: CreateCatalogDto) {
        const exists = await this.catalogModel.findOne({ name: data.name });
        if (exists){
            throw new ConflictException('El catálogo ya existe');
        } 

        const lastCatalog = await this.catalogModel.findOne().sort({ codigo: -1 }).exec();
        const nextCode = lastCatalog ? lastCatalog.codigo + 1 : 1;

        const catalog = new this.catalogModel({
            ...data,
            codigo: nextCode, 
        });
        return catalog.save();
    }


    findAll() {
        return this.catalogModel.find().sort({codigo:1});
    }

    async findOne(id: string) {
        const catalog = await this.catalogModel.findById(id);
        if (!catalog){
            throw new NotFoundException('Catálogo no encontrado');
        }
        return catalog;
    }

    async update(id: string, data: UpdateCatalogDto) {
        const updated = await this.catalogModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated){
            throw new NotFoundException('Catálogo no encontrado');
        }
        return updated;
    }

  async remove(id: string) {
        const deleted = await this.catalogModel.findByIdAndDelete(id);
        if (!deleted){
            throw new NotFoundException('Catálogo no encontrado');
        }
        return deleted;
  }
}
