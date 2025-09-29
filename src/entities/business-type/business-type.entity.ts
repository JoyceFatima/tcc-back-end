/*
 * Este arquivo define a entidade `BusinessType`, que mapeia a tabela
 * correspondente no banco de dados usando o TypeORM.
 *
 * Uma entidade representa uma tabela, e suas propriedades (`@Column`)
 * representam as colunas da tabela.
 *
 * Principais características:
 *
 * - **`@Entity('business_type')`**: Associa esta classe à tabela `business_type`.
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

@Entity('business_type')
export class BusinessType {
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
