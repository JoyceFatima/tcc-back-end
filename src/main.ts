/*
 * Este é o arquivo principal de inicialização da aplicação NestJS.
 *
 * Ele é o ponto de entrada da aplicação e é responsável por:
 *
 * 1.  Criar a instância principal da aplicação (`NestFactory.create`).
 * 2.  Configurar pipes e interceptors globais, como validação de dados (`ValidationPipe`)
 * e serialização de classes (`ClassSerializerInterceptor`).
 * 3.  Habilitar o CORS para permitir requisições de outras origens.
 * 4.  Integrar a documentação da API usando o Swagger.
 * 5.  Iniciar o servidor HTTP para que a aplicação possa receber requisições.
 */

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { config } from './config';
import { AppModule } from './modules/app.module';
import { enableSwagger } from './swagger.service';

const {
  api: { port },
} = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  enableSwagger(app);
  await app.listen(port || 3000);
}
bootstrap();
