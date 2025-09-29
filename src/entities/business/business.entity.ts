/*
 * Este arquivo define a entidade `Business` (negócio), que mapeia a tabela
 * correspondente no banco de dados usando o TypeORM.
 *
 * Uma entidade representa uma tabela, e suas propriedades (`@Column`)
 * representam as colunas da tabela.
 *
 * Principais características:
 *
 * - **`@Entity('business')`**: Associa esta classe à tabela chamada 'business'.
 * - **`@PrimaryGeneratedColumn('uuid')`**: Define `id` como chave primária,
 * gerada automaticamente como um UUID.
 * - **`@Column(...)`**: Define as colunas padrão, como `name`, `description` e `address`.
 * - **`@CreateDateColumn`**, **`@UpdateDateColumn`**, **`@DeleteDateColumn`**:
 * Gerenciam automaticamente as datas de criação, atualização e exclusão (soft delete).
 * - **`@ManyToOne(...)` e `@JoinColumn(...)`**: Estabelecem relacionamentos de
 * "muitos para um" com as entidades `User`, `BusinessType` e `TargetAudience`.
 * Isso cria chaves estrangeiras (`ownerId`, `businessTypeId`, `targetAudienceId`)
 * que ligam a tabela `business` a outras tabelas.
 */

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
import { TargetAudience } from '../target-audience/target-audience.entity';
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

  @ManyToOne(() => TargetAudience, (targetAudience) => targetAudience.id)
  @JoinColumn({ name: 'target_audience_id' })
  targetAudience: TargetAudience;
}
