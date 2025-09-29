/*
 * Este é um "Guard" (Guarda) do NestJS para autorização baseada em papéis (roles).
 *
 * Ele é usado para proteger rotas, garantindo que apenas usuários com as
 * permissões corretas possam acessá-las.
 *
 * Como funciona:
 *
 * 1.  **Lê os papéis necessários**: Usa o `Reflector` para obter os papéis (@Roles)
 * definidos na rota ou no método do controlador.
 * 2.  **Verifica o usuário**: Obtém o objeto do usuário da requisição (assumindo que
 * o usuário já foi autenticado).
 * 3.  **Compara os papéis**: Verifica se o usuário possui algum dos papéis
 * necessários para a rota.
 * 4.  **Decide o acesso**:
 * - Se o usuário tiver um dos papéis, permite o acesso.
 * - Caso contrário, lança uma `ForbiddenException` (erro 403), negando o acesso.
 */

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '@/common/enums/role.enum';
import { User } from '@/entities/users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const hasRole = requiredRoles.some((role) =>
      user.userRoles.some((userRole) => userRole.role.name === role),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: You need one of the following roles: [${requiredRoles.join(', ')}]`,
      );
    }

    return true;
  }
}
