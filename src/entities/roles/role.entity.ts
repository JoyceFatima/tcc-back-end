/*
 * Este arquivo define a entidade `Role`, que mapeia a tabela de papéis (funções de usuário)
 * no banco de dados usando o TypeORM.
 *
 * Uma entidade representa uma tabela, e suas propriedades (`@Column`)
 * representam as colunas da tabela.
 *
 * Principais características:
 *
 * - **`@Entity('roles')`**: Associa esta classe à tabela `roles`.
 * - **`@PrimaryGeneratedColumn('uuid')`**: Define `id` como chave primária,
 * gerada automaticamente como um UUID.
 * - **`@Column({ type: 'enum', ... })`**: Define a coluna `name` como um tipo
 * `enum` do banco de dados, garantindo que os valores sejam restritos aos
 * definidos no `Role` enum. A propriedade `unique: true` evita papéis duplicados.
 * - **`@Column({ default: true })`**: Define a coluna `isActive` com um valor padrão
 * de `true`.
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

import { Role as RoleName } from '../../common/enums/role.enum';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleName,
    unique: true,
  })
  name: RoleName;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @Index()
  deletedAt: Date;
}
