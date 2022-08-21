import { Status } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsEnum(Status)
  status: Status;

  @IsString()
  serviceId: string;
}
