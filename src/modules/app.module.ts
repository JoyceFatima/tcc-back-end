import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from '../common/database/database-config';

import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';
import { BusinessTypeModule } from './business-type/business-type.module';
import { RolesModule } from './roles/roles.module';
import { TargetAudienceModule } from './target-audience/target-audience.module';
import { UsersModule } from './users/users.module';

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
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}
  onModuleInit() {}
}
