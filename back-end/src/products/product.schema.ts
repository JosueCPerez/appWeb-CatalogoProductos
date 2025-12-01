import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {

  @Prop({ required: true, unique: true })
  codigo: number; // codigo autoincrementable 

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Catalog' }], default: [] })
  catalogIds: string[]; // referencia al o a los catalogos que puede pertenecer un producto

  @Prop()
  description?: string;

  @Prop()
  image?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
