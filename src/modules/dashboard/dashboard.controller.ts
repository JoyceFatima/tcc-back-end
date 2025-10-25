import { Controller, Get, Param, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Dashboard } from '@/entities/dashboard/dashboard.entity';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':businessId')
  @ApiOkResponse({ type: DashboardDto })
  getDashboardData(@Param('businessId') businessId: string): Promise<DashboardDto> {
    return this.dashboardService.getDashboardData(businessId);
  }

  @Post('generate/:businessId')
  @ApiOkResponse({ type: Dashboard })
  generateDashboardData(@Param('businessId') businessId: string): Promise<Dashboard> {
    return this.dashboardService.generateDashboardData(businessId);
  }
}
