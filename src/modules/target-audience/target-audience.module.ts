import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TargetAudience } from '../../entities/target-audience/target-audience.entity';

import { TargetAudienceController } from './target-audience.controller';
import { TargetAudienceService } from './target-audience.service';

@Module({
  controllers: [TargetAudienceController],
  providers: [TargetAudienceService],
  exports: [TargetAudienceService],
  imports: [TypeOrmModule.forFeature([TargetAudience]), TargetAudienceModule],
})
export class TargetAudienceModule {}
