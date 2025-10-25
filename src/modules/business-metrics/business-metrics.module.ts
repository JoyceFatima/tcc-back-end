import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessMetric } from '@/entities/business-metric/business-metric.entity';

import { BusinessMetricsController } from './business-metrics.controller';
import { BusinessMetricsService } from './business-metrics.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessMetric])],
  controllers: [BusinessMetricsController],
  providers: [BusinessMetricsService],
})
export class BusinessMetricsModule {}
