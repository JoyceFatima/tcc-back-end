import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TargetAudienceService } from './target-audience.service';

@ApiTags('TargetAudience')
@Controller('target-audience')
export class TargetAudienceController {
  constructor(private readonly targetAudienceService: TargetAudienceService) {}

  @Get()
  async findAll() {
    return this.targetAudienceService.find();
  }
}
