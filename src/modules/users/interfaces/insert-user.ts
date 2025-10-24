import { Role } from '@/common/enums';

import { Business } from '../../../entities/business/business.entity';
import { User } from '../../../entities/users/user.entity';

export interface IInsertUser {
  user: Partial<User>;
  business?: Partial<Business>;
  role?: Role;
}
