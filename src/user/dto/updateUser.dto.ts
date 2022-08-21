import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 10)
  phoneNumber: string;

  @IsEnum(Role)
  role: Role;
}
