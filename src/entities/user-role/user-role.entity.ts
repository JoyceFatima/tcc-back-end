/*
 * Este arquivo define a entidade `UserRole`, que serve como uma tabela de junção
 * para o relacionamento "muitos para muitos" (Many-to-Many) entre `User` e `Role`.
 *
 * Sua principal função é associar um usuário a um ou mais papéis (roles).
 *
 * Como funciona:
 *
 * - `@Entity('users_role')`: Mapeia a classe para uma tabela chamada `users_role`.
 * - `@PrimaryGeneratedColumn('uuid')`: Define a chave primária da tabela.
 * - `@ManyToOne(...)` e `@JoinColumn(...)`: Estabelecem as chaves estrangeiras
 * para as tabelas `User` e `Role`, criando o relacionamento. O `eager: true`
 * no relacionamento com `Role` garante que o papel do usuário seja carregado
 * automaticamente ao buscar um `UserRole`.
 *
 * Essa entidade é fundamental para implementar o controle de acesso baseado em papéis
 * (RBAC - Role-Based Access Control) na aplicação.
 */

import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';

@Entity('users_role')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
