import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TargetAudience } from '../../entities/target-audience/target-audience.entity';

@Injectable()
export class TargetAudienceService {
  constructor(
    @InjectRepository(TargetAudience)
    private businessRepository: Repository<TargetAudience>,
  ) {}

  async find(where?: Partial<TargetAudience>): Promise<TargetAudience[]> {
    try {
      return await this.businessRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving businesss');
    }
  }

  async findOne(where?: Partial<TargetAudience>): Promise<TargetAudience> {
    try {
      const business = await this.businessRepository.findOne({ where });
      return business;
    } catch {
      throw new InternalServerErrorException('Error retrieving business');
    }
  }

  async insert(data: Partial<TargetAudience>): Promise<TargetAudience> {
    try {
      const business = await this.businessRepository.save({ ...data });

      return business;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<TargetAudience>): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('TargetAudience not found');

    await this.businessRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('TargetAudience not found');

    await this.businessRepository.delete(id);
  }
}
