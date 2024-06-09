import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';

@Controller('roles')
export class RolesController {

    constructor (private rolesService:RolesService){ }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Post()
    create(@Body() rol:CreateRolDto){
        return this.rolesService.create(rol);
    }


}
