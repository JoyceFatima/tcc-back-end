import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from '../common/database/database-config';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}
  onModuleInit() {}
}
