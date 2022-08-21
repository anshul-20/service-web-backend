import { Role, Status } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class GetAllOrdersQueryDto {
  @IsEnum(Status)
  status: Status;

  @IsEnum(Role)
  role: Role;

  @IsString()
  workerId: string;
}
