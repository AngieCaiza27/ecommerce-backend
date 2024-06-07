import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor (private authService:AuthService){}

    @Post('register')// http://localhost:300/auth/register -> POST
    register(@Body() user:RegisterAuthDto){
        return this.authService.resgister(user);
    }

    @Post('login')// http://localhost:300/auth/login -> POST
    login(@Body() loginData:LoginAuthDto){
        return this.authService.login(loginData);
    }

}
