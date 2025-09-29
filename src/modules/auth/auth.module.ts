/*
 * Este módulo gerencia toda a lógica de autenticação da aplicação.
 *
 * Ele agrupa e organiza os componentes relacionados à autenticação, como:
 * - O `AuthController`, que lida com as requisições HTTP para login e renovação de token.
 * - O `AuthService`, que contém a lógica de negócio para a autenticação.
 *
 * As importações (`imports`) são essenciais para que o módulo funcione corretamente:
 * - `TypeOrmModule.forFeature([User])`: Registra a entidade `User` no módulo,
 * permitindo que o `AuthService` interaja com a tabela de usuários no banco de dados.
 * - `UsersModule`: Importa o `UsersModule` para que o `AuthService` possa usar
 * o `UsersService` para buscar e validar usuários.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entities/users/user.entity';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
})
export class AuthModule {}
