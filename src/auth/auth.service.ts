import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository:Repository<User>
    ){}

    async resgister(user:RegisterUserDto){

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
}
