import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Business } from '../business/business.entity';
import { DashboardDto } from '../../modules/dashboard/dto/dashboard.dto';

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

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;
}
