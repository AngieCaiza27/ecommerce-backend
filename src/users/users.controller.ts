import { Body, Controller, Get, Post, UseGuards,Put,Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    //get--obtener
    //post--crear
    //put - patch -- actualizar
    //delete -- Borrar
    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Get() // http://localhost/users -> GET
    findAll(){

        return this.usersService.findAll();

    }
    @Post() // http://localhost:172.23.0.1/users -> POST
    create(@Body() user: CreateUserDto){

        return this.usersService.create(user);

    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Put(':id') // http://172.23.0.1:3000/users/:id -> PUT
    update(@Param('id',ParseIntPipe) id:number,  @Body() user :UpdateUserDto){

        return this.usersService.update(id,user);

    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile (
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                  new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
              }),
    ) file: Express.Multer.File,
    @Param('id',ParseIntPipe) id:number,
    @Body() user :UpdateUserDto 

) {
    return this.usersService.updateWithImage(file,id,user);
}

    
}
