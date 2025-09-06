import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BusinessService } from './business.service';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
}
