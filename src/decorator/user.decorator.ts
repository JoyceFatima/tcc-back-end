/*
 * Este é um decorador de parâmetro personalizado do NestJS.
 *
 * Ele é projetado para simplificar a injeção do objeto de usuário na
 * rota de um controlador, que geralmente é adicionado à requisição por
 * um "Guard" de autenticação (como o `AuthGuard`).
 *
 * Como usar:
 *
 * - `@UserDecorator()`: Injeta o objeto de usuário completo na rota.
 * - `@UserDecorator('id')`: Injeta apenas uma propriedade específica
 * (por exemplo, o `id` do usuário).
 *
 * Isso evita a necessidade de acessar `request.user` diretamente em
 * cada método do controlador.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
