import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessType } from '../../entities/business-type/business-type.entity';

import { BusinessTypeController } from './business-type.controller';
import { BusinessTypeService } from './business-type.service';

@Module({
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService],
  exports: [BusinessTypeService],
  imports: [TypeOrmModule.forFeature([BusinessType]), BusinessTypeModule],
})
export class BusinessTypeModule {}
