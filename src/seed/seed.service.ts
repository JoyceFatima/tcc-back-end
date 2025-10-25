/*
 * Este serviço é o núcleo do script de semente (seed) da aplicação.
 *
 * Ele é responsável por popular o banco de dados com dados essenciais para o
 * funcionamento inicial do sistema.
 *
 * Como funciona:
 *
 * - Ele usa serviços de outros módulos (`RolesService`, `BusinessTypeService`, etc.)
 * para interagir com o banco de dados.
 * - Cada método (`roles`, `businessTypes`, `targetAudiences`) verifica se os
 * dados já existem antes de inseri-los, evitando duplicatas em execuções
 * subsequentes do script.
 * - O método `run` orquestra a execução de todos os métodos de semente na
 * ordem correta.
 *
 * Este serviço é injetado e executado pelo script `seed-script.ts`.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../common/enums';
import { Business } from '../entities/business/business.entity';
import { BusinessType } from '../entities/business-type/business-type.entity';
import { Dashboard } from '../entities/dashboard/dashboard.entity';
import { TargetAudience } from '../entities/target-audience/target-audience.entity';
import { BusinessService } from '../modules/business/business.service';
import { BusinessTypeService } from '../modules/business-type/business-type.service';
import { RolesService } from '../modules/roles/roles.service';
import { TargetAudienceService } from '../modules/target-audience/target-audience.service';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: Repository<Dashboard>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly targetAudiencesService: TargetAudienceService,
    private readonly rolesService: RolesService,
    private readonly businessTypesService: BusinessTypeService,
    private readonly usersService: UsersService,
    private readonly businessService: BusinessService,
  ) {}

  async roles() {
    const roles = [
      { role: Role.MASTER, description: 'Acesso total ao sistema' },
      { role: Role.EMPLOYER, description: 'Acesso de dono de negócio' },
    ];

    for (const roleData of roles) {
      const existingRole = await this.rolesService.find({
        name: roleData.role,
      });
      if (existingRole.length > 0) {
        continue;
      }

      await this.rolesService.insert(roleData);
    }
  }

  async businessTypes() {
    const businessTypes: Partial<BusinessType>[] = [
      { name: 'Restaurante' },
      { name: 'Varejo' },
      { name: 'Serviços' },
      { name: 'Saúde' },
      { name: 'Beleza' },
      { name: 'Educação' },
      { name: 'Outro' },
    ];

    for (const type of businessTypes) {
      const existingType = await this.businessTypesService.find({
        name: type.name,
      });
      if (existingType.length > 0) {
        continue;
      }

      await this.businessTypesService.insert(type);
    }
  }

  async targetAudiences() {
    const targetAudiences: Partial<TargetAudience>[] = [
      { name: 'Jovens Adultos (18-30)' },
      { name: 'Adultos (30-50)' },
      { name: 'Idosos (50+)' },
      { name: 'Famílias' },
      { name: 'Profissionais' },
      { name: 'Estudantes' },
    ];

    for (const audience of targetAudiences) {
      const existingAudience = await this.targetAudiencesService.find({
        name: audience.name,
      });
      if (existingAudience.length > 0) {
        continue;
      }

      await this.targetAudiencesService.insert({ name: audience.name });
    }
  }

  async users() {
    const usersToSeed = [
      {
        email: 'master@email.com',
        password: 'password123',
        roleName: Role.MASTER,
        phone: '99999999999',
        document: '11111111111',
      },
      {
        email: 'employer@email.com',
        password: 'password123',
        roleName: Role.EMPLOYER,
        phone: '88888888888',
        document: '22222222222',
      },
    ];

    const [businessType] = await this.businessTypesService.find({});
    if (!businessType) {
      console.error(
        'Nenhum BusinessType encontrado. Rode a seed de businessTypes primeiro.',
      );
      return;
    }

    const [targetAudience] = await this.targetAudiencesService.find({});
    if (!targetAudience) {
      console.error(
        'Nenhum TargetAudience encontrado. Rode a seed de targetAudiences primeiro.',
      );
      return;
    }

    for (const userData of usersToSeed) {
      const existingUser = await this.usersService.findOne({
        email: userData.email,
      });
      if (existingUser) {
        console.log(`Usuário ${userData.email} já existe. Pulando.`);
        continue;
      }

      const [role] = await this.rolesService.find({ name: userData.roleName });
      if (!role) {
        console.error(
          `Role ${userData.roleName} não encontrada. Pulando usuário.`,
        );
        continue;
      }

      // 1. Cria o usuário primeiro, sem o businessId
      const user = await this.usersService.insert({
        user: {
          email: userData.email,
          password: userData.password,
          name:
            userData.roleName.charAt(0).toUpperCase() +
            userData.roleName.slice(1).toLowerCase(),
          lastName: 'User',
          phone: userData.phone,
          document: userData.document,
        },
        role: userData.roleName,
      });

      // 2. Cria o negócio, usando o ID do usuário como proprietário
      await this.businessService.insert({
        name: `Negócio de ${user.name}`,
        description: 'Negócio de teste criado via seed.',
        address: 'Rua dos Testes, 123',
        budget: 10000,
        ownerId: user.id,
        businessTypeId: businessType.id,
        targetAudienceId: targetAudience.id,
      });
    }
  }

  async run() {
    await this.roles();
    await this.businessTypes();
    await this.targetAudiences();
    await this.users();
  }
}
