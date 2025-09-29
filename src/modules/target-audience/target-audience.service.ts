/*
 * Este serviço gerencia todas as operações de banco de dados para a entidade `TargetAudience`.
 *
 * Ele abstrai a lógica de acesso ao banco de dados, oferecendo métodos simples
 * e reutilizáveis para interagir com a tabela de público-alvo.
 *
 * Principais responsabilidades:
 *
 * - **`find`**: Busca todos os públicos-alvo que correspondem a um critério de filtro opcional.
 * - **`findOne`**: Busca um único público-alvo por um critério específico.
 * - **`insert`**: Salva um novo público-alvo no banco de dados.
 * - **`update`**: Atualiza as informações de um público-alvo existente.
 * - **`delete`**: Remove um público-alvo do banco de dados (geralmente uma exclusão lógica, ou "soft delete").
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

import { TargetAudience } from '../../entities/target-audience/target-audience.entity';

@Injectable()
export class TargetAudienceService {
  constructor(
    @InjectRepository(TargetAudience)
    private businessRepository: Repository<TargetAudience>,
  ) {}

  async find(where?: Partial<TargetAudience>): Promise<TargetAudience[]> {
    try {
      return await this.businessRepository.find({ where });
    } catch {
      throw new InternalServerErrorException('Error retrieving businesss');
    }
  }

  async findOne(where?: Partial<TargetAudience>): Promise<TargetAudience> {
    try {
      const business = await this.businessRepository.findOne({ where });
      return business;
    } catch {
      throw new InternalServerErrorException('Error retrieving business');
    }
  }

  async insert(data: Partial<TargetAudience>): Promise<TargetAudience> {
    try {
      const business = await this.businessRepository.save({ ...data });

      return business;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<TargetAudience>): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('TargetAudience not found');

    await this.businessRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const business = await this.findOne({ id });
    if (!business) throw new NotFoundException('TargetAudience not found');

    await this.businessRepository.delete(id);
  }
}
