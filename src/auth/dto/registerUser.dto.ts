import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsOptional()
  serviceId: string;
}
