import { Status } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(Status)
  status: Status;
}
