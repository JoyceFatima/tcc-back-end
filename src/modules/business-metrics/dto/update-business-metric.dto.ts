import { IsOptional, IsString } from 'class-validator';

export class UpdateBusinessMetricDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  change?: string;

  @IsOptional()
  @IsString()
  trend?: string;
}
