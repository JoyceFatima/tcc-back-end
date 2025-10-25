import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Dashboard } from '@/entities/dashboard/dashboard.entity';
import { Business } from '@/entities/business/business.entity';
import { GeminiModule } from '../gemini/gemini.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard, Business]), GeminiModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
