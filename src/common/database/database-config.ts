import { DataSourceOptions } from 'typeorm';

import { config } from '@/config';

const { database } = config;

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.pass,
  database: database.name,
  entities: ['dist/entities/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/common/database/migrations/*.{ts,js}'],
};

export const seedDatabaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.pass,
  database: database.name,
  entities: ['src/entities/**/**/*.entity{.ts,.js}'],
  migrations: ['src/common/database/migrations/*.{ts,js}'],
};
