import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 16)
  password: string;

  @IsString()
  @Length(10, 10)
  phoneNumber: string;

  @IsEnum(Role)
  role: Role;
}
