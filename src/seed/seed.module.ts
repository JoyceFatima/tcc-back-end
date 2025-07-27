import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { seedDatabaseConfig } from '@/common/database/database-config';
import { AuthModule } from '@/modules/auth/auth.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { UsersModule } from '@/modules/users/users.module';

import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(seedDatabaseConfig),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    RolesModule,
    SeedModule,
  ],
  providers: [SeedService],
})
export class SeedModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {}
}
