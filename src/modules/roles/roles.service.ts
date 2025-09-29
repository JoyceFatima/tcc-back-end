/*
 * Este serviço gerencia todas as operações de banco de dados para a entidade `Role`.
 *
 * Ele abstrai a lógica de acesso ao banco de dados, oferecendo métodos para
 * buscar, inserir e deletar papéis (roles) de usuário.
 *
 * Principais responsabilidades:
 *
 * - **`find`**: Busca todos os papéis que correspondem a um critério de filtro opcional.
 * - **`insert`**: Salva um novo papel no banco de dados. Ele utiliza a função
 * `capitalize` para gerar uma descrição a partir do nome do papel.
 * - **`delete`**: Remove um papel do banco de dados, garantindo que o papel
 * a ser removido realmente exista, caso contrário, lança uma exceção.
 *
 * O serviço usa a injeção de dependência para obter o repositório do TypeORM,
 * o que facilita a interação com a tabela `roles`.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { capitalize } from '@/utils/funcs';

import { Role } from '../../entities/roles/role.entity';

import { IRole } from './interfaces/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async find(where?: Partial<Role>): Promise<Role[]> {
    return await this.rolesRepository.find({ where });
  }

  async insert(data: IRole): Promise<Role> {
    console.log('Inserting role:', data);
    const result = await this.rolesRepository.save({
      name: data.role,
      description: capitalize(data.role),
    });
    return result;
  }

  async delete(id: string): Promise<void> {
    const role = await this.rolesRepository.findOne({ where: { id } });

    if (!role) throw new NotFoundException('Roles not found');

    await this.rolesRepository.delete(role.id);
  }
}
