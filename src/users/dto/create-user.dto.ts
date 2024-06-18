import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  notification_token?: string;
}
