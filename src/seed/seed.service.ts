import { Injectable } from '@nestjs/common';

import { Role } from '@/common/enums';
import { User } from '@/entities/users/user.entity';
import { RolesService } from '@/modules/roles/roles.service';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UsersService,
    private readonly rolesService: RolesService,
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

  async users() {
    const masters: Partial<User>[] = [
      {
        email: 'john@master.com',
        password: 'Password@123',
        name: 'John',
        lastName: 'Doe',
        document: '12345678901',
        phone: '+1234567890',
      },
    ];

    const employers: Partial<User>[] = [
      {
        email: 'dave@employer.com',
        password: 'Password@123',
        name: 'Dave',
        lastName: 'Smith',
        document: '10987654321',
        phone: '+0987654321',
      },
    ];

    for (const user of [...masters, ...employers]) {
      const existingUser = await this.userService.findOne({
        email: user.email,
      });
      if (existingUser) {
        continue;
      }

      await this.userService.insert(
        {
          ...user,
        },
        masters.includes(user) ? Role.MASTER : Role.EMPLOYER,
      );
    }
  }

  async run() {
    await this.roles();
    await this.users();
  }
}
