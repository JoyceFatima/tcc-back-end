import { User } from '../../../entities/users/user.entity';

export interface IInsertUser {
  user: Partial<User>;
}
