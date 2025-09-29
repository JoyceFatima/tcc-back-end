/*
 * Este arquivo contém funções utilitárias para tarefas de segurança,
 * como criptografia de senhas e manipulação de tokens JWT (JSON Web Token).
 *
 * As funções aqui servem para:
 *
 * 1.  **Criptografia de Senhas**:
 * - `encryptPassword`: Criptografa uma senha usando `bcrypt` antes de salvá-la no banco de dados.
 * - `decryptPassword`: Compara uma senha em texto plano com sua versão criptografada para autenticação.
 *
 * 2.  **Geração e Verificação de Tokens JWT**:
 * - `generateToken`: Cria um novo token de autenticação para um usuário.
 * - `decodeToken`: Decodifica um token sem verificar sua validade (útil para inspecionar o conteúdo).
 * - `verifyToken`: Verifica a autenticidade e a validade de um token (lança um erro se for inválido).
 *
 * 3.  **Manipulação de Tokens**:
 * - `getToken`: Extrai o token de autenticação de um cabeçalho HTTP `Authorization`.
 * - `isTokenExpired`: Verifica se um token já expirou, baseando-se na data de validade.
 */

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { config } from '@/config';
import { User } from '@/entities/users/user.entity';

const {
  secutiy: { bcryptSalt, jwtSecret, jwtExpire },
} = config;

export const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, parseInt(bcryptSalt));
};

export const decryptPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const generateToken = (data: User): string => {
  return jwt.sign(data, jwtSecret, { expiresIn: jwtExpire });
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, jwtSecret);
};

export const getToken = (authorization: string): string => {
  return authorization.split(' ')[1];
};

export const isTokenExpired = (token: string): boolean => {
  const { exp } = decodeToken(token);
  return exp < Date.now() / 1000;
};
