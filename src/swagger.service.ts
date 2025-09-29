/*
 * Este arquivo configura a documentação da API usando o Swagger.
 *
 * A função `enableSwagger` cria um endpoint de documentação interativo
 * que descreve todos os endpoints, modelos de dados e métodos de autenticação da sua API.
 * Isso é fundamental para:
 *
 * 1.  **Desenvolvedores**: Entender e usar a API facilmente.
 * 2.  **Testes**: Testar os endpoints diretamente da interface do navegador.
 * 3.  **Colaboração**: Servir como uma referência central para a equipe.
 *
 * O Swagger pode ser acessado na rota definida (padrão: `/api`).
 */

import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const enableSwagger = (app: INestApplication, path = 'api') => {
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TCC Back-End API')
    .setVersion(`1`)
    .build();
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup(path, app, swaggerDocument);
};
