/*
 * Este arquivo define a entidade `User`, que mapeia a tabela de usuários
 * no banco de dados usando o TypeORM.
 *
 * Uma entidade representa uma tabela, e suas propriedades (@Column)
 * representam as colunas da tabela.
 *
 * Principais características:
 *
 * - **`@Entity('users')`**: Associa esta classe à tabela `users`.
 * - **`@ApiProperty(...)`**: Adiciona metadados para a documentação da API (Swagger),
 * descrevendo cada propriedade.
 * - **`@Exclude({ toClassOnly: false })`**: Usado com o `ClassSerializerInterceptor`
 * para garantir que a propriedade `password` seja excluída das respostas da API,
 * protegendo dados sensíveis.
 * - **`@Column({ unique: true })`**: Garante que os valores de colunas como
 * `email`, `phone` e `document` sejam únicos no banco de dados.
 * - **`@CreateDateColumn`**, **`@UpdateDateColumn`**, **`@DeleteDateColumn`**:
 * Gerenciam automaticamente as datas de criação, atualização e exclusão (soft delete).
 * - **`@OneToMany(...)`**: Estabelece um relacionamento "um para muitos" com a
 * entidade `UserRole`. As opções `eager: true` e `cascade: true` garantem que os
 * papéis do usuário sejam carregados e persistidos automaticamente.
 */

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
  @Column()
  name: string;

  @ApiProperty({
    description: 'Unique last name for the user',
    example: 'Doe',
    required: true,
  })
  @Column()
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
