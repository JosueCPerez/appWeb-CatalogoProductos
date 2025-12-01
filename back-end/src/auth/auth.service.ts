import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logind.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,private readonly jwtService: JwtService,) {}

    async login(data: LoginDto) {
        //console.log ("entra al metodo de loging")
        const usuairo = await this.usersService.findByEmail(data.email);

        if(!usuairo){
            throw new UnauthorizedException('Usuario no existe');
        }else{
            //copmpara pass para validar que tenga credenciales correctas
            const passwordValid = await bcrypt.compare(data.password, usuairo.password);

            //si no son correctas devuelve mensaje de error
            if (!passwordValid){
                console.log (data)
                throw new UnauthorizedException('Credenciales incorrectas'); 
            }

            //si con correctas crea el token y lo devuelve
            const payload = {
                sub: usuairo._id,
                email: usuairo.email,
                role: usuairo.role
            };

            const token = this.jwtService.sign(payload );

            return { token };
        }
    }
}
