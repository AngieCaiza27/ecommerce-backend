import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { In, Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import {compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository:Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,

        private jwtService:JwtService
    ){}


    async resgister(user:RegisterAuthDto){

        const emailExist = await this.usersRepository.findOneBy({email:user.email})
        if (emailExist){
            //409 CONFLIC
            return new HttpException('El email ya esta registrado',HttpStatus.CONFLICT);
        }
        const phoneExist = await this.usersRepository.findOneBy({phone:user.phone})
        if (phoneExist){
            //409 CONFLIC
            return new HttpException('El telefono ya esta registrado',HttpStatus.CONFLICT);
        }
        
        const newUser = this.usersRepository.create(user);
        const rolesIds= user.rolesIds;
        const roles = await this.rolesRepository.findBy({id: In(rolesIds)})
        newUser.roles= roles;
        
        const userSaved= await this.usersRepository.save(newUser);
        const rolesString = userSaved.roles.map(rol =>rol.id);
        
        const payload={id:userSaved.id,
                        name:userSaved.name,
                        roles: rolesIds}
        const token=this.jwtService.sign(payload);
        const data ={
            user:userSaved,
            token:'Bearer ' + token
        }
        delete data.user.password;
        return data;
    }

    async login(loginData:LoginAuthDto){

        const {email,password}=loginData;
        const userFound = await this.usersRepository.findOne({
            where:{email:email},
            relations:['roles']
        })
        if (!userFound){
            //409 CONFLIC
            return new HttpException('El email no esta registrado',HttpStatus.NOT_FOUND);
        }

        const isPasswordValid= await compare(password,userFound.password);
        if (!isPasswordValid){
            return new HttpException('La contraseña es incorrecta',HttpStatus.FORBIDDEN);
        }

        const rolesIds= userFound.roles.map(rol => rol.id); //['CLIENT','ADMIN']

        const payload={id:userFound.id,
            name:userFound.name, 
            roles: rolesIds}
        const token=this.jwtService.sign(payload);
        const data ={
            user:userFound,
            token:'Bearer ' +token
        }

        delete data.user.password;
        return data;
    }
}