import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Business } from '../business/business.entity';
import { BusinessMetric } from '../business-metric/business-metric.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'float' })
  target: number;

  @Column({ type: 'float', default: 0 })
  current: number;

  @ManyToOne(() => Business, (business) => business.goals)
  business: Business;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => BusinessMetric, (metric) => metric.goals)
  @JoinColumn({ name: 'metric_id' })
  metric: BusinessMetric;

  @Column({ name: 'metric_id', type: 'uuid', nullable: true })
  metricId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
