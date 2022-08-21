import { IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(100)
  @Max(1000)
  price: number;
}
