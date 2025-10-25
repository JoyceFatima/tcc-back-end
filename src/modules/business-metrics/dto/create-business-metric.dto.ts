import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBusinessMetricDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsString()
  change: string;

  @IsNotEmpty()
  @IsString()
  trend: string;

  @IsNotEmpty()
  @IsUUID()
  businessId: string;
}
