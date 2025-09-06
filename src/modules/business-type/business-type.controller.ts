import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BusinessTypeService } from './business-type.service';

@ApiTags('BusinessType')
@Controller('business-type')
export class BusinessTypeController {
  constructor(private readonly businessTypeService: BusinessTypeService) {}

  @Get()
  async findAll() {
    return this.businessTypeService.find();
  }
}
