import { Exclude } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class AuthenticatedUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  role: string;

  @IsString()
  @Exclude()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<AuthenticatedUserDto>) {
    Object.assign(this, partial);
  }
}
