import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BusinessType } from '../business-type/business-type.entity';
import { User } from '../users/user.entity';

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 2000 })
  description: string;

  @Column({ name: 'address', type: 'varchar', length: 500 })
  address: string;

  @Column({ name: 'budget', type: 'decimal', precision: 10, scale: 2 })
  budget: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @Index()
  deletedAt: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string;

  @Column({ name: 'business_type_id', type: 'uuid' })
  businessTypeId: string;

  @Column({ name: 'target_audience_id', type: 'uuid' })
  targetAudienceId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => BusinessType, (businessType) => businessType.id)
  @JoinColumn({ name: 'business_type_id' })
  businessType: BusinessType;

  @ManyToOne(() => BusinessType, (businessType) => businessType.id)
  @JoinColumn({ name: 'target_audience_id' })
  targetAudience: BusinessType;
}
