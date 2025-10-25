import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Business } from '../business/business.entity';
import { DashboardDto } from '../../modules/dashboard/dto/dashboard.dto';

@Entity('dashboards')
export class Dashboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  stats: DashboardDto['stats'];

  @Column({ type: 'json' })
  locationAnalysis: DashboardDto['locationAnalysis'];

  @Column({ type: 'json' })
  insights: DashboardDto['insights'];

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;
}
