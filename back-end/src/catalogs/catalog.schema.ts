import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Catalog extends Document {

    @Prop({ required: true, unique: true })
    codigo: number;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description?: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
