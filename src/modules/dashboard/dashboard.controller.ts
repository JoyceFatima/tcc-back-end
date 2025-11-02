import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { Dashboard } from '../../entities/dashboard/dashboard.entity';

import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':businessId')
  @ApiOkResponse({ type: DashboardDto })
  getDashboardData(
    @Param('businessId') businessId: string,
  ): Promise<DashboardDto> {
    return this.dashboardService.getDashboardData(businessId);
  }

  @Get('history/:businessId')
  @ApiOkResponse({ type: [DashboardDto] })
  getArchivedDashboards(
    @Param('businessId') businessId: string,
  ): Promise<DashboardDto[]> {
    return this.dashboardService.getArchivedDashboardData(businessId);
  }

  @Post('generate/:businessId')
  @ApiOkResponse({ type: Dashboard })
  generateDashboardData(
    @Param('businessId') businessId: string,
  ): Promise<Dashboard> {
    return this.dashboardService.generateDashboardData(businessId);
  }
}
