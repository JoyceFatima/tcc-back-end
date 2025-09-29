/*
 * Este arquivo define um "enum" (enumeração) para os status de um objeto,
 * provavelmente um e-mail ou uma transação.
 *
 * A principal função deste enum é:
 * - Fornecer um conjunto fixo e seguro de valores para representar o estado de um item.
 * - Evitar erros de digitação ao referenciar os status em outras partes do código.
 * - Melhorar a legibilidade e a manutenção do código.
 *
 * Os status definidos são `PROCESSING` (em processamento), `SENT` (enviado) e
 * `DELIVERED` (entregue).
 */

export enum Status {
  PROCESSING = 'processing',
  SENT = 'sent',
  DELIVERED = 'delivered',
}
