import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(100)
  @Max(1000)
  price: number;
}
