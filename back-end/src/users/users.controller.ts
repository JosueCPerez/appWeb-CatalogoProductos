import { Body, Controller, Post, Get, Patch, Delete, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUsuarioDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUsuarioDto){
    return this.usersService.create(data)
  }

  @Get()
  findAll(){
    return this.usersService.findAll()
  }

  @Patch(':id')
  update(@Param('id') id:string,@Body() body:any){
    return this.usersService.update(id,body)
  }

  @Delete(':id')
  remove(@Param('id') id:string){
    return this.usersService.remove(id)
  }
}
