import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Business } from '../../entities/business/business.entity';

import { BusinessService } from './business.service';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get(':ownerId')
  async findOne(@Param('ownerId') ownerId: string): Promise<Business> {
    const business = await this.businessService.findOne({ ownerId });
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    return business;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Business>,
  ): Promise<{ message: string; statusCode: number }> {
    await this.businessService.update(id, data);
    return { message: 'Business updated successfully', statusCode: 200 };
  }
}
