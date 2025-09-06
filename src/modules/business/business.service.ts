import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Business } from '../../entities/business/business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  async find(where?: Partial<Business>): Promise<Business[]> {
    try {
      return await this.businessRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving businesss');
    }
  }

  async findOne(where?: Partial<Business>): Promise<Business> {
    try {
      const business = await this.businessRepository.findOne({ where });
      return business;
    } catch {
      throw new InternalServerErrorException('Error retrieving business');
    }
  }

  async insert(data: Partial<Business>): Promise<Business> {
    try {
      const business = await this.businessRepository.save({ ...data });

      return business;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<Business>): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('Business not found');

    await this.businessRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('Business not found');

    await this.businessRepository.delete(id);
  }
}
