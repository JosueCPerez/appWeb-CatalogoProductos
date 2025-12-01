import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>,) { }

    async create(data: CreateProductDto) {
        // obtener ultimo producto registrado
        const last = await this.productModel.findOne().sort({ codigo: -1 }).exec();
        const nextCode = last ? last.codigo + 1 : 1;

        const product = new this.productModel({
            ...data,
            codigo: nextCode,
        });

        return product.save();
    }


    async findAll(){
        return this.productModel.find().exec(); 
    }

    
    async findOne(id: string) {
        const product = await this.productModel.findById(id).populate('catalogId');
        if (!product) throw new NotFoundException('Producto no encontrado');
        return product;
    }

    async findByCatalog(catalogId: string) {
        return this.productModel.find({ catalogIds: catalogId });
    }


    async update(id: string, data: UpdateProductDto) {
        const updated = await this.productModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new NotFoundException('Producto no encontrado');
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.productModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Producto no encontrado');
        return deleted;
    }
}
