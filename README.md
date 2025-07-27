# API do Projeto de TCC

API backend com [NestJS](https://nestjs.com/) desenvolvida para o Trabalho de Conclusão de Curso.

### Pré-requisitos

- **Node.js** (v18.x ou superior)
- **NPM**
- **Banco de Dados** (ex: MySql )

---

### 🚀 Setup Rápido

Siga os passos no terminal para rodar o projeto.

**Bash**

```
# 1. Clone o repositório e entre na pasta
git clone https://github.com/seu-usuario/tcc-back-end.git
cd tcc-back-end

# 2. Instale as dependências
npm install

# 3. Configure suas variáveis de ambiente
# (Copie o arquivo .env.example para .env e preencha com seus dados)
cp .env.example .env

# 4. Aplique as migrations no banco de dados
npm run migration:run

# 5. Inicie o servidor em modo de desenvolvimento
npm run start:dev
```

A API estará rodando em `http://localhost:3000`.

---

### 📜 Comandos Principais

| Comando                                    | Descrição                                  |
| ------------------------------------------ | ------------------------------------------ |
| `npm run start:dev`                        | Inicia o servidor com hot-reload.          |
| `npm run build`                            | Compila o projeto para produção.           |
| `npm run start:prod`                       | Roda a versão de produção (após o build).  |
|                                            |                                            |
| `npm run test`                             | Executa todos os testes (Jest).            |
| `npm run test:cov`                         | Gera o relatório de cobertura de testes.   |
|                                            |                                            |
| `npm run lint`                             | Analisa e corrige o código com ESLint.     |
| `npm run format`                           | Formata o código com Prettier.             |
|                                            |                                            |
| `npm run migration:run`                    | Aplica as migrations pendentes.            |
| `npm run migration:revert`                 | Reverte a última migration.                |
| `npm run migration:generate -- --name=...` | Gera uma migration a partir das entidades. |
| `npm run seed`                             | Popula o banco com dados iniciais.         |
