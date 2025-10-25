import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { BusinessMetricsService } from './business-metrics.service';
import { CreateBusinessMetricDto } from './dto/create-business-metric.dto';
import { UpdateBusinessMetricDto } from './dto/update-business-metric.dto';

@Controller('business/:businessId/metrics')
export class BusinessMetricsController {
  constructor(private readonly service: BusinessMetricsService) {}

  @Post()
  create(@Body() createDto: CreateBusinessMetricDto) {
    return this.service.create(createDto);
  }

  @Get()
  findByBusinessId(@Param('businessId') businessId: string) {
    return this.service.findByBusinessId(businessId);
  }

  @Patch(':metricId')
  update(
    @Param('metricId') metricId: string,
    @Body() updateDto: UpdateBusinessMetricDto,
  ) {
    return this.service.update(metricId, updateDto);
  }
}
