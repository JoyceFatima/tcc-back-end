
import { ApiProperty } from '@nestjs/swagger';

class DashboardStatsDto {
  @ApiProperty()
  locationScore: number;

  @ApiProperty()
  locationScoreChange: number;

  @ApiProperty()
  dailyFootfall: number;

  @ApiProperty()
  targetAudienceCompatibility: number;

  @ApiProperty()
  competitors: number;
}

class AnalysisItemDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  score: number;
}

class LocationAnalysisDto {
  @ApiProperty()
  overallScore: number;

  @ApiProperty({ type: [AnalysisItemDto] })
  analysisItems: AnalysisItemDto[];
}

class InsightDto {
  @ApiProperty()
  type: 'positive' | 'warning' | 'negative';

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

class BusinessInfoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  targetAudience: string;
}

export class DashboardDto {
  @ApiProperty()
  stats: DashboardStatsDto;

  @ApiProperty()
  locationAnalysis: LocationAnalysisDto;

  @ApiProperty({ type: [InsightDto] })
  insights: InsightDto[];

  @ApiProperty()
  businessInfo: BusinessInfoDto;
}
