/*
 * Este serviço gerencia todas as operações de banco de dados para a entidade `BusinessType`.
 *
 * Ele abstrai a lógica de acesso ao banco de dados, oferecendo métodos simples
 * e reutilizáveis para interagir com a tabela de tipos de negócio.
 *
 * Principais responsabilidades:
 *
 * - **`find`**: Busca todos os tipos de negócio que correspondem a um critério de filtro opcional.
 * - **`findOne`**: Busca um único tipo de negócio por um critério específico.
 * - **`insert`**: Salva um novo tipo de negócio no banco de dados.
 * - **`update`**: Atualiza as informações de um tipo de negócio existente.
 * - **`delete`**: Remove um tipo de negócio do banco de dados (geralmente uma exclusão lógica, ou "soft delete").
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

import { BusinessType } from '../../entities/business-type/business-type.entity';

@Injectable()
export class BusinessTypeService {
  constructor(
    @InjectRepository(BusinessType)
    private businessRepository: Repository<BusinessType>,
  ) {}

  async find(where?: Partial<BusinessType>): Promise<BusinessType[]> {
    try {
      return await this.businessRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving businesss');
    }
  }

  async findOne(where?: Partial<BusinessType>): Promise<BusinessType> {
    try {
      const business = await this.businessRepository.findOne({ where });
      return business;
    } catch {
      throw new InternalServerErrorException('Error retrieving business');
    }
  }

  async insert(data: Partial<BusinessType>): Promise<BusinessType> {
    try {
      const business = await this.businessRepository.save({ ...data });

      return business;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<BusinessType>): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('BusinessType not found');

    await this.businessRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('BusinessType not found');

    await this.businessRepository.delete(id);
  }
}
