/*
 * Este arquivo contém uma função utilitária para manipulação de strings.
 *
 * A função `capitalize` serve para converter a primeira letra de uma
 * string para maiúscula, deixando o restante da string inalterado.
 *
 * Exemplo de uso:
 * capitalize('hello world'); // Retorna 'Hello world'
 */

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
