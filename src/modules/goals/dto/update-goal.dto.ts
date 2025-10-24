import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';

import { CreateGoalDto } from './create-goal.dto';

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @IsNumber()
  @IsOptional()
  current?: number;
}
