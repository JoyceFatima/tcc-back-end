/*
 * Este é o controlador de autenticação da aplicação.
 *
 * Ele gerencia as rotas (endpoints) relacionadas à autenticação de usuários,
 * como login e renovação de token.
 *
 * Principais características:
 *
 * - **`@ApiTags('Auth')`**: Usado para agrupar as rotas na documentação do Swagger.
 * - **`@Controller('auth')`**: Define o prefixo da rota para todos os endpoints deste controlador.
 * - **`login`**: Recebe credenciais de login e, se válidas, retorna um token JWT.
 * - **`renew-token`**: Permite que um usuário com um token JWT válido gere um novo token,
 * estendendo a sessão. O `@UseGuards(new AuthGuard())` garante que apenas
 * requisições autenticadas possam acessar este endpoint.
 */

import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/guards/auth.guard';
import { getToken } from '@/utils/funcs';

import { AuthService } from './auth.service';
import { ILogin } from './interfaces/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() user: ILogin) {
    try {
      const res = await this.authService.login(user);
      return { message: 'Success', data: res, statusCode: 200 };
    } catch (error) {
      throw { message: error.message, statusCode: 400 };
    }
  }

  @Post('renew-token')
  @UseGuards(new AuthGuard())
  async renewToken(@Headers('Authorization') authHeader: string) {
    const jwt = getToken(authHeader);
    const res = await this.authService.renewToken(jwt);
    return { message: 'Success', data: res, statusCode: 200 };
  }
}
