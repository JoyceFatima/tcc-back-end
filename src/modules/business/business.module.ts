import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Business } from '../../entities/business/business.entity';

import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService],
  imports: [TypeOrmModule.forFeature([Business]), BusinessModule],
})
export class BusinessModule {}
