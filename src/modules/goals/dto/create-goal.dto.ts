import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  target: number;
}
