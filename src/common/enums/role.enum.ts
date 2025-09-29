/*
 * Este arquivo define um "enum" (enumeração) para os papéis (roles) de usuário.
 *
 * A principal função deste enum é:
 * - Fornecer um conjunto fixo e seguro de papéis para a aplicação.
 * - Evitar erros de digitação ao referenciar os papéis em outras partes do código.
 * - Melhorar a legibilidade e a manutenção do código, especialmente em guarda
 * de autorização (guards) e validações.
 *
 * Atualmente, os papéis definidos são `MASTER` e `EMPLOYER`.
 */

export enum Role {
  MASTER = 'master',
  EMPLOYER = 'employer',
}
