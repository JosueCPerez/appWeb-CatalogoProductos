import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUsuarioDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()

export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(data: CreateUsuarioDto) { // metodo para crear usuario en base de datos

        // validar que el usuario no exista- valida el email
        const exists = await this.userModel.findOne({ email: data.email });
        if (exists) {
            throw new ConflictException('Email ya esta registrado.');
        }

        //validar username
        const existsUserName = await this.userModel.findOne({ userName: data.userName });
        if (existsUserName) {
            throw new ConflictException('Nobre de usuario ya esta usado.');
        }
        // encriptar contraseña - se usa libreria bcrypt
        const hashed = await bcrypt.hash(data.password, 10);

        // guardar usuario
        const user = new this.userModel({
            ...data,
            password: hashed,
        });

        return user.save();
    }

    async findByEmail(data: string) {
        const usuario = await this.userModel.findOne({ email: data });
        if (usuario) {
            return usuario;
        } else {
            return null;
        }
    }

    async findAll() {
        return this.userModel.find()
    }

    async update(id: string, data: any) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true })
    }

    async remove(id: string) {
        return this.userModel.findByIdAndDelete(id)
    }

}
