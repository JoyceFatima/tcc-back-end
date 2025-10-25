/*
 * Este arquivo centraliza todas as configurações da aplicação.
 *
 * Ele lê as variáveis de ambiente de um arquivo `.env` e as organiza
 * em um objeto de configuração estruturado.
 *
 * A principal função deste arquivo é:
 * - Separar as configurações sensíveis (como credenciais de banco de dados e chaves de API)
 * do código-fonte.
 * - Fornecer um acesso fácil e tipado a essas configurações em toda a aplicação.
 *
 * As variáveis de ambiente são carregadas no início para garantir que estejam disponíveis
 * para todos os módulos.
 */

import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: Number(process.env.DATABASE_PORT),
    pass: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  api: {
    port: process.env.PORT,
  },
  secutiy: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIres_IN,
    bcryptSalt: process.env.BCRYPT_SALT,
  },
  email: {
    brevoApiKey: process.env.BREVO_API_KEY,
    brevoSenderEmail: process.env.BREVO_FROM_EMAIL,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
};
