import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,          
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/catalogdb'),


    UsersModule,
    AuthModule,
    CatalogsModule,
    ProductsModule
  ]
})
export class AppModule {}
