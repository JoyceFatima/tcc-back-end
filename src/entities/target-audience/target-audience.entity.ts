/*
 * Este arquivo define a entidade `TargetAudience`, que mapeia a tabela
 * de público-alvo no banco de dados usando o TypeORM.
 *
 * Uma entidade representa uma tabela, e suas propriedades (`@Column`)
 * representam as colunas da tabela.
 *
 * Principais características:
 *
 * - **`@Entity('target_audience')`**: Associa esta classe à tabela `target_audience`.
 * - **`@PrimaryGeneratedColumn('uuid')`**: Define `id` como chave primária,
 * gerada automaticamente como um UUID.
 * - **`@Column(...)`**: Define a coluna `name` como uma string de até 100 caracteres,
 * garantindo que cada nome seja único na tabela.
 * - **`@CreateDateColumn`**, **`@UpdateDateColumn`**, **`@DeleteDateColumn`**:
 * Gerenciam automaticamente as datas de criação, atualização e exclusão (soft delete).
 */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('target_audience')
export class TargetAudience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @Index()
  deletedAt: Date;
}
