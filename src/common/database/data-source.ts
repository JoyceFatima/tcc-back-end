/*
 * Este arquivo configura a fonte de dados (DataSource) do TypeORM para a aplicação.
 *
 * A principal função deste arquivo é criar uma instância `DataSource`
 * que será utilizada para interagir com o banco de dados.
 *
 * Como funciona:
 *
 * 1.  Importa as configurações básicas do banco de dados (`databaseConfig`).
 * 2.  Adiciona as rotas completas para as entidades e migrações na pasta `src`.
 * 3.  Exporta a instância `AppDataSource` para que possa ser usada
 * em outros módulos da aplicação, como para executar migrações ou
 * conectar a aplicação ao banco de dados.
 */

import { DataSource } from 'typeorm';

import { databaseConfig } from './database-config';

export const AppDataSource = new DataSource({
  ...databaseConfig,
  entities: ['src/entities/**/**/*.entity{.ts,.js}', 'src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.{ts,js}'],
});
