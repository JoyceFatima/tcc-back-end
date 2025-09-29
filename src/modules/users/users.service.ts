/*
 * Este serviço gerencia todas as operações de banco de dados e lógica de negócio para a entidade `User`.
 *
 * Ele é responsável por interagir com a tabela de usuários e as tabelas relacionadas (como papéis e negócios).
 *
 * Principais responsabilidades:
 *
 * - **`find` e `findOne`**: Métodos para buscar um ou mais usuários no banco de dados.
 * - **`insert`**: Cria um novo usuário. Antes de salvar, ele valida se o usuário já existe,
 * criptografa a senha e atribui o papel padrão (`EMPLOYER`). Se houver dados de negócio,
 * ele também os cria.
 * - **`upsert`**: Atualiza um usuário existente ou o cria se ele não existir.
 * Se o usuário for atualizado, ele gerencia a remoção e recriação dos papéis para garantir a consistência.
 * - **`update`**: Atualiza as informações de um usuário existente.
 * - **`changePassword`**: Permite que um usuário altere sua senha, verificando a senha antiga
 * antes de criptografar e salvar a nova.
 * - **`delete`**: Remove um usuário, incluindo a remoção dos seus papéis associados para evitar
 * dados órfãos.
 *
 * Este serviço demonstra uma camada de serviço robusta, onde a lógica de negócio
 * é separada da lógica do controlador e do repositório, garantindo um código mais limpo e
 * reutilizável.
 */

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../../common/enums/role.enum';
import { User } from '../../entities/users/user.entity';
import { decryptPassword, encryptPassword } from '../../utils/funcs';
import { BusinessService } from '../business/business.service';
import { RolesService } from '../roles/roles.service';
import { UsersRolesService } from '../users-roles/users-roles.service';

import { IChangePassword } from './interfaces/change-password';
import { IInsertUser } from './interfaces/insert-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
    private usersRolesService: UsersRolesService,
    private businessService: BusinessService,
  ) {}

  async find(where?: Partial<User>): Promise<User[]> {
    try {
      return await this.usersRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  async findOne(where?: Partial<User>): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where });
      return user;
    } catch {
      throw new InternalServerErrorException('Error retrieving user');
    }
  }

  async insert(data: IInsertUser): Promise<User> {
    const { user, business } = data;

    try {
      const findUser = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      if (findUser) {
        throw new Error('User already exists');
      }

      const [role] = await this.rolesService.find({ name: Role.EMPLOYER });
      if (!role) throw new NotFoundException('Role not found');

      if (!user.password) {
        throw new Error('Password is required');
      }

      const password = encryptPassword(user.password);
      const result = await this.usersRepository.save({ ...user, password });
      this.usersRolesService.insert({
        user: result,
        role,
      });
      if (business) {
        this.businessService.insert({ ...business, ownerId: result.id });
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async upsert(data: IInsertUser, id?: string): Promise<void> {
    const user = await this.findOne({ id });

    if (!user) {
      await this.insert(data);
    } else {
      for (const role of user.userRoles) {
        await this.usersRolesService.delete(role.id);
      }
      const userUpdated = await this.usersRepository.save(data.user);

      this.usersRolesService.insert({
        user: userUpdated,
        role: data.user.userRoles[0].role,
      });
    }
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const user = await this.findOne({ id });
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.update(id, data);
  }

  async changePassword(
    userId: string,
    passwords: IChangePassword,
  ): Promise<void> {
    const { password, newPassword } = passwords;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const isOldPasswordValid = decryptPassword(password, user.password);
    if (!isOldPasswordValid) {
      throw new BadRequestException('Password is incorrect');
    }

    user.password = encryptPassword(newPassword);
    await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const [user] = await this.find({ id });
    if (!user) throw new NotFoundException('User not found');

    for (const role of user.userRoles) {
      await this.usersRolesService.delete(role.id);
    }
    await this.usersRepository.delete(id);
  }
}
