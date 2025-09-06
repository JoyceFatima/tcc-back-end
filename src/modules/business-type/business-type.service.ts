import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BusinessType } from '../../entities/business-type/business-type.entity';

@Injectable()
export class BusinessTypeService {
  constructor(
    @InjectRepository(BusinessType)
    private businessRepository: Repository<BusinessType>,
  ) {}

  async find(where?: Partial<BusinessType>): Promise<BusinessType[]> {
    try {
      return await this.businessRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving businesss');
    }
  }

  async findOne(where?: Partial<BusinessType>): Promise<BusinessType> {
    try {
      const business = await this.businessRepository.findOne({ where });
      return business;
    } catch {
      throw new InternalServerErrorException('Error retrieving business');
    }
  }

  async insert(data: Partial<BusinessType>): Promise<BusinessType> {
    try {
      const business = await this.businessRepository.save({ ...data });

      return business;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<BusinessType>): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('BusinessType not found');

    await this.businessRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('BusinessType not found');

    await this.businessRepository.delete(id);
  }
}
