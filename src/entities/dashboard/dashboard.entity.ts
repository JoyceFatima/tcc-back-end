import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { DashboardDto } from '../../modules/dashboard/dto/dashboard.dto';
import { Business } from '../business/business.entity';

@Entity('dashboards')
export class Dashboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  stats: DashboardDto['stats'];

  @Column({ type: 'jsonb' })
  locationAnalysis: DashboardDto['locationAnalysis'];

  @Column({ type: 'jsonb' })
  insights: DashboardDto['insights'];

  @ManyToOne(() => Business)
  @JoinColumn()
  business: Business;

  @Column({ type: 'boolean', default: false })
  finished: boolean;
}
