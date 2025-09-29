/*
 * Este é um decorador personalizado do NestJS para definir metadados.
 *
 * Sua única função é associar uma lista de papéis (roles) a um controlador
 * ou a um método de rota.
 *
 * Como funciona:
 *
 * - Ele usa a função `SetMetadata` do NestJS para adicionar os papéis
 * (por exemplo, `['ADMIN', 'MANAGER']`) a um "chave" específica, neste caso, `'roles'`.
 * - O `RolesGuard` (guarda de papéis) pode então ler esses metadados para
 * determinar se o usuário tem permissão para acessar a rota protegida.
 *
 * Exemplo de uso:
 *
 * `@Roles(Role.Admin)`
 * `minhaRotaProtegida(@Body() dto: ...)`
 */

import { SetMetadata } from '@nestjs/common';

import { Role } from '../common/enums/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
