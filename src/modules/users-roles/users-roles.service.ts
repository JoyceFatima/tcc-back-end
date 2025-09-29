/*
 * Este serviço gerencia todas as operações de banco de dados para a entidade `UserRole`.
 *
 * Ele é responsável por manipular a tabela de junção que associa usuários a papéis
 * (roles). A tabela `UserRole` é essencial para implementar o controle de acesso
 * baseado em papéis (RBAC).
 *
 * Principais responsabilidades:
 *
 * - **`find`**: Busca todas as associações entre usuários e papéis que correspondem
 * a um critério de filtro opcional. Ele pode incluir os dados completos de `user` e `role`
 * se a opção `relations` for fornecida.
 * - **`insert`**: Salva uma nova associação, ligando um usuário a um papel.
 * - **`delete`**: Remove uma associação `UserRole` pelo seu ID. Antes de deletar,
 * ele verifica se a associação existe, lançando uma exceção se não for encontrada.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRole } from '../../entities/user-role/user-role.entity';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UserRole)
    private usersRolesRepository: Repository<UserRole>,
  ) {}

  async find(
    where?: Partial<UserRole>,
    relations: string[] = [],
  ): Promise<UserRole[]> {
    return await this.usersRolesRepository.find({ where, relations });
  }

  async insert(data: Partial<UserRole>): Promise<UserRole> {
    return await this.usersRolesRepository.save(data);
  }

  async delete(id: string): Promise<void> {
    const role = await this.usersRolesRepository.findOne({ where: { id } });

    if (!role) throw new NotFoundException('UserRoles not found');

    await this.usersRolesRepository.delete(role.id);
  }
}
