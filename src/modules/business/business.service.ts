/*
 * Este serviço gerencia todas as operações de banco de dados para a entidade `Business`.
 *
 * Ele abstrai a lógica de acesso ao banco de dados, oferecendo métodos simples
 * e reutilizáveis para interagir com a tabela de negócios.
 *
 * Principais responsabilidades:
 *
 * - **`find`**: Busca todos os negócios que correspondem a um critério de filtro opcional.
 * - **`findOne`**: Busca um único negócio por um critério específico.
 * - **`insert`**: Salva um novo negócio no banco de dados.
 * - **`update`**: Atualiza as informações de um negócio existente.
 * - **`delete`**: Remove um negócio do banco de dados (geralmente uma exclusão lógica, ou "soft delete").
 *
 * Cada método inclui tratamento de erros para garantir que a aplicação responda
 * de forma adequada em caso de falhas no banco de dados, lançando exceções NestJS.
 */

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Business } from '../../entities/business/business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  async find(where?: Partial<Business>): Promise<Business[]> {
    try {
      return await this.businessRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving businesss');
    }
  }

  async findOne(where?: Partial<Business>): Promise<Business> {
    try {
      const business = await this.businessRepository.findOne({ where });
      return business;
    } catch {
      throw new InternalServerErrorException('Error retrieving business');
    }
  }

  async insert(data: Partial<Business>): Promise<Business> {
    try {
      const business = await this.businessRepository.save({ ...data });

      return business;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<Business>): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('Business not found');

    await this.businessRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('Business not found');

    await this.businessRepository.delete(id);
  }
}
