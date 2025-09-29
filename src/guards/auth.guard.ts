/*
 * Este é um "Guard" (Guarda) do NestJS para autenticação baseada em token JWT.
 *
 * Sua principal função é proteger rotas, garantindo que apenas requisições
 * com um token de autenticação válido possam prosseguir.
 *
 * Como funciona:
 *
 * 1.  **Verifica o cabeçalho**: A guarda inspeciona o cabeçalho `Authorization`
 * da requisição para garantir que ele exista e esteja no formato correto (`Bearer <token>`).
 * 2.  **Valida o token**: Extrai o token e utiliza a função `verifyToken` para
 * checar sua validade (assinatura e expiração).
 * 3.  **Anexa o usuário**: Se o token for válido, a guarda decodifica os dados
 * do usuário contidos no token e os anexa ao objeto de requisição (`request.user`).
 * 4.  **Decide o acesso**:
 * - Se a validação for bem-sucedida, a requisição continua (`return true`).
 * - Se o token estiver ausente, mal formatado, inválido ou expirado,
 * a guarda lança uma `UnauthorizedException` (erro 401), interrompendo o fluxo.
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { verifyToken } from '@/utils/funcs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authentication token format');
    }

    const token = authHeader.substring(7);
    return this.validateToken(token, request);
  }

  private async validateToken(token: string, request: any): Promise<boolean> {
    try {
      const user = await verifyToken(token);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Token validation error: ' + error.message,
      );
    }
  }
}
