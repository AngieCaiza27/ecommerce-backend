import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';

@Controller('auth')
export class AuthController {

    constructor (private authService:AuthService){}

    @Post('register')// http://localhost:300/auth/register -> POST
    register(@Body() user:RegisterUserDto){
        return this.authService.resgister(user);
    }

}
