import { Injectable } from '@nestjs/common';

import { Role } from '../common/enums';
import { BusinessType } from '../entities/business-type/business-type.entity';
import { BusinessTypeService } from '../modules/business-type/business-type.service';
import { RolesService } from '../modules/roles/roles.service';
import { TargetAudienceService } from '../modules/target-audience/target-audience.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly targetAudiencesService: TargetAudienceService,
    private readonly rolesService: RolesService,
    private readonly businessTypesService: BusinessTypeService,
  ) {}

  async roles() {
    const roles: Role[] = [Role.MASTER, Role.EMPLOYER];

    for (const role of roles) {
      const existingRole = await this.rolesService.find();
      if (existingRole.some((r) => r.name === role)) {
        continue;
      }

      await this.rolesService.insert({ role });
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
    const targetAudiences: Partial<BusinessType>[] = [
      { name: 'Jovens Adultos (18-30)' },
      { name: 'Adultos (30-50)' },
      { name: 'Idosos (50+)' },
      { name: 'Famílias' },
      { name: 'Profissionais' },
      { name: 'Estudantes' },
    ];

    for (const audience of targetAudiences) {
      const existingAudience = await this.businessTypesService.find({
        name: audience.name,
      });
      if (existingAudience.length > 0) {
        continue;
      }

      await this.targetAudiencesService.insert(audience);
    }
  }

  async run() {
    await this.roles();
    await this.businessTypes();
    await this.targetAudiences();
  }
}
