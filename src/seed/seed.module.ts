/*
 * Este módulo é o ponto de entrada para o script de semente (seed) da aplicação.
 *
 * Ele configura e gerencia as dependências necessárias para popular o banco de dados
 * com dados iniciais ou de teste.
 *
 * Como funciona:
 *
 * 1.  **Configuração do TypeORM**: Ele importa o `TypeOrmModule` usando a configuração
 * específica para o ambiente de semente (`seedDatabaseConfig`), garantindo que o script
 * possa acessar e manipular o banco de dados.
 * 2.  **Importação de Módulos**: Inclui todos os módulos que contêm as entidades e
 * serviços necessários para a criação dos dados.
 * 3.  **Provedor de Serviço**: Fornece o `SeedService`, que contém a lógica principal
 * para a execução da semente.
 *
 * Este módulo não inicializa um servidor web, apenas o contexto de aplicação
 * necessário para rodar o script de semente.
 */

import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { seedDatabaseConfig } from '../common/database/database-config';
import { AuthModule } from '../modules/auth/auth.module';
import { BusinessModule } from '../modules/business/business.module';
import { BusinessTypeModule } from '../modules/business-type/business-type.module';
import { RolesModule } from '../modules/roles/roles.module';
import { TargetAudienceModule } from '../modules/target-audience/target-audience.module';
import { UsersModule } from '../modules/users/users.module';

import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(seedDatabaseConfig),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    RolesModule,
    BusinessTypeModule,
    TargetAudienceModule,
    BusinessModule,
  ],
  providers: [SeedService],
})
export class SeedModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {}
}
