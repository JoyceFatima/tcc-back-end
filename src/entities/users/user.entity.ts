import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRole } from '../user-role/user-role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Unique email address for the user',
    example: 'user@example.com',
    required: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Unique phone number for the user',
    example: '+1234567890',
    required: true,
  })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({
    description: 'Unique document number for the user',
    example: '99999999999',
    required: true,
  })
  @Column({ unique: true })
  document: string;

  @ApiProperty({
    description: 'Unique name for the user',
    example: 'John',
    required: true,
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'Unique last name for the user',
    example: 'Doe',
    required: true,
  })
  @Column({ unique: true })
  lastName: string;

  @ApiProperty({
    description: 'Encrypted password for the user',
    example: 'hashed_password_here',
    required: true,
  })
  @Exclude({ toClassOnly: false })
  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @Index()
  deletedAt: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    eager: true,
    cascade: true,
  })
  userRoles: UserRole[];
}
