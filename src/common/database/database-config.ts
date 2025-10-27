/*
 * Este arquivo centraliza a configuração do banco de dados para a aplicação TypeORM.
 *
 * Ele define duas configurações principais:
 *
 * 1.  **`databaseConfig`**: Usada para a aplicação principal. Ela aponta para os
 * arquivos de entidades e migrações na pasta de distribuição (`dist`),
 * que é gerada após a compilação do TypeScript.
 *
 * 2.  **`seedDatabaseConfig`**: Usada especificamente para o script de semente (seed).
 * Ela aponta para os arquivos de entidades e migrações na pasta de origem (`src`),
 * permitindo que o script de semente seja executado diretamente em um ambiente de
 * desenvolvimento, antes da compilação.
 *
 * O uso de variáveis de ambiente (`config`) garante que as credenciais do
 * banco de dados permaneçam seguras e flexíveis para diferentes ambientes.
 */

import { DataSourceOptions } from 'typeorm';

import { config } from '@/config';

const { database } = config;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.pass,
  database: database.name,
  entities: ['dist/entities/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  ssl: true,
};

export const seedDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.pass,
  database: database.name,
  entities: ['src/entities/**/**/*.entity{.ts,.js}'],
  migrations: ['src/common/database/migrations/*.{ts,js}'],
  ssl: true,
};
