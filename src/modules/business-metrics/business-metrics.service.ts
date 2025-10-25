import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BusinessMetric } from '@/entities/business-metric/business-metric.entity';

import { CreateBusinessMetricDto } from './dto/create-business-metric.dto';
import { UpdateBusinessMetricDto } from './dto/update-business-metric.dto';

@Injectable()
export class BusinessMetricsService {
  constructor(
    @InjectRepository(BusinessMetric)
    private readonly repository: Repository<BusinessMetric>,
  ) {}

  async create(dto: CreateBusinessMetricDto): Promise<BusinessMetric> {
    const metric = this.repository.create(dto);
    return this.repository.save(metric);
  }

  async findByBusinessId(businessId: string): Promise<BusinessMetric[]> {
    return this.repository.find({ where: { businessId } });
  }

  async update(
    id: string,
    dto: UpdateBusinessMetricDto,
  ): Promise<BusinessMetric> {
    const metric = await this.repository.findOne({ where: { id } });
    if (!metric) {
      throw new NotFoundException(`Metric with ID ${id} not found`);
    }
    this.repository.merge(metric, dto);
    return this.repository.save(metric);
  }
}
