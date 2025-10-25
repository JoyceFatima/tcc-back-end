import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessMetric } from '@/entities/business-metric/business-metric.entity';
import { Goal } from '@/entities/goals/goal.entity';

import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, BusinessMetric])],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
