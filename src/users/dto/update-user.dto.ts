import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    name?:String;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    lastname?:String;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    phone?:String;

    @IsOptional()
    image?:String;
    @IsOptional()
    notification_token?:String;
}