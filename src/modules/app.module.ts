/* eslint-disable import/order */
/*
 * Este é o módulo raiz da aplicação NestJS.
 *
 * Ele serve como o ponto de partida e o principal organizador de todos os
 * outros módulos da aplicação. Sua função é agrupar e gerenciar as dependências
 * e a estrutura geral da aplicação.
 *
 * Como funciona:
 *
 * - **`@Module`**: Este decorador define o módulo e suas configurações.
 * - **`imports`**: Esta propriedade importa todos os outros módulos (ex: `UsersModule`,
 * `AuthModule`) e serviços globais (`TypeOrmModule`, `EventEmitterModule`).
 * - **`TypeOrmModule.forRoot`**: Configura a conexão principal com o banco de dados
 * usando as definições do arquivo `database-config`.
 *
 * A classe `AppModule` não contém uma lógica de negócio específica, servindo apenas
 * para integrar todas as partes da aplicação em um único lugar.
 */

import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from '../common/database/database-config';

import { AuthModule } from './auth/auth.module';
import { BusinessTypeModule } from './business-type/business-type.module';
import { BusinessModule } from './business/business.module';
import { RolesModule } from './roles/roles.module';
import { TargetAudienceModule } from './target-audience/target-audience.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    RolesModule,
    BusinessModule,
    BusinessTypeModule,
    TargetAudienceModule,
    GoalsModule,
    DashboardModule,
    GeminiModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}
  onModuleInit() {}
}
