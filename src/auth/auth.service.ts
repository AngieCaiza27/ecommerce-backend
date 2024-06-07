import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import {compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository:Repository<User>,
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
        return this.usersRepository.save(newUser);
    }

    async login(loginData:LoginAuthDto){

        const {email,password}=loginData;
        const userFound = await this.usersRepository.findOneBy({email:email})
        if (!userFound){
            //409 CONFLIC
            return new HttpException('El email no esta registrado',HttpStatus.NOT_FOUND);
        }

        const isPasswordValid= await compare(password,userFound.password);
        if (!isPasswordValid){
            return new HttpException('La contraseña es incorrecta',HttpStatus.FORBIDDEN);
        }

        const payload={id:userFound.id,name:userFound.name}
        const token=this.jwtService.sign(payload);
        const data ={
            user:userFound,
            token:token
        } 
        return data;
    }
}
