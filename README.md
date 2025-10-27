# 1 - Instalação das Ferramentas de Desenvolvimento

Para preparar seu ambiente de desenvolvimento, siga os passos abaixo para instalar as ferramentas essenciais.

---

### a) Node.js

O Node.js é um ambiente de execução JavaScript que permite executar código JavaScript no servidor. O `npm` (Node Package Manager), que é o gerenciador de pacotes do Node.js, será instalado junto com ele.

**Recomendação:** Instale a versão **LTS** (Long Term Support), que é a mais estável.

#### **Windows**

1. **Acesse o site oficial:** Abra seu navegador e vá para a página de downloads do [Node.js](https://nodejs.org/en/download/).
2. **Baixe o instalador:** Clique na opção "Windows Installer (.msi)" para a versão LTS.
3. **Execute o instalador:** Abra o arquivo `.msi` que você baixou.
4. **Siga as instruções:** Prossiga com a instalação clicando em "Next". Aceite os termos de licença e mantenha as configurações padrão. A instalação incluirá o `npm`.
5. **Verifique a instalação:** Abra o Prompt de Comando (CMD) ou o PowerShell e digite os seguintes comandos para verificar se a instalação foi bem-sucedida:
   **Bash**

   ```
   node -v
   npm -v
   ```

   Você deverá ver as versões do Node.js e do npm instaladas.

#### **macOS**

1. **Acesse o site oficial:** Abra seu navegador e vá para a página de downloads do [Node.js](https://nodejs.org/en/download/).
2. **Baixe o instalador:** Clique na opção "macOS Installer (.pkg)" para a versão LTS.
3. **Execute o instalador:** Abra o arquivo `.pkg` baixado.
4. **Siga as instruções:** Continue com a instalação, aceitando os termos e mantendo as configurações padrão.
5. **Verifique a instalação:** Abra o Terminal e digite os seguintes comandos:
   **Bash**

   ```
   node -v
   npm -v
   ```

#### **Linux (Ubuntu/Debian)**

1. **Abra o Terminal.**
2. **Instale o Node.js e o npm usando o `apt`:**
   **Bash**

   ```
   sudo apt update
   sudo apt install nodejs npm
   ```

3. **Verifique a instalação:**
   **Bash**

   ```
   node -v
   npm -v
   ```

---

### b) Git

Git é um sistema de controle de versão distribuído, essencial para o desenvolvimento de software moderno.

#### **Windows**

1. **Acesse o site oficial:** Vá para a página de downloads do [Git](https://git-scm.com/download/win).
2. **Baixe o instalador:** O download deve começar automaticamente.
3. **Execute o instalador:** Abra o arquivo `.exe` baixado.
4. **Siga as instruções:** Mantenha as configurações padrão recomendadas pelo instalador, a menos que você tenha uma preferência específica.
5. **Verifique a instalação:** Abra um novo Prompt de Comando ou PowerShell e digite:
   **Bash**

   ```
   git --version
   ```

#### **macOS**

O Git geralmente já vem instalado no macOS. Para verificar, abra o Terminal e digite `git --version`. Se não estiver instalado, você pode instalá-lo com o Homebrew:

1. **Instale o Homebrew (se ainda não tiver):**
   **Bash**

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Instale o Git:**
   **Bash**

   ```
   brew install git
   ```

3. **Verifique a instalação:**
   **Bash**

   ```
   git --version
   ```

#### **Linux (Ubuntu/Debian)**

1. **Abra o Terminal.**
2. **Instale o Git com `apt`:**
   **Bash**

   ```
   sudo apt update
   sudo apt install git
   ```

3. **Verifique a instalação:**
   **Bash**

   ```
   git --version
   ```

---

### c) Editor de Código-fonte: Visual Studio Code (VS Code)

Um editor de código-fonte moderno e altamente personalizável.

#### **Windows, macOS e Linux**

1. **Acesse o site oficial:** Vá para a página de downloads do [Visual Studio Code](https://code.visualstudio.com/download).
2. **Baixe o instalador:** O site detectará automaticamente seu sistema operacional. Clique no botão de download para a versão estável (Stable).
3. **Execute o instalador:**

   - **Windows:** Abra o arquivo `.exe` e siga as instruções. É recomendado marcar a opção "Add to PATH" durante a instalação.
   - **macOS:** Arraste o ícone do VS Code para a sua pasta de Aplicativos.
   - **Linux:**

     - Para **Debian/Ubuntu** , baixe o pacote `.deb` e instale-o com o comando:
       **Bash**

       ```
       sudo apt install ./<file>.deb
       ```

     - Para **Fedora/CentOS** , baixe o pacote `.rpm`.

---

### d) Gerenciador de Banco de Dados: DBeaver

DBeaver é um cliente de banco de dados universal que suporta diversos sistemas de banco de dados, incluindo o PostgreSQL.

#### **Windows, macOS e Linux**

1. **Acesse o site oficial:** Vá para a página de downloads do [DBeaver](https://dbeaver.io/download/).
2. **Baixe o instalador:** Escolha a versão "Community Edition" para o seu sistema operacional.
3. **Execute o instalador:** Siga as instruções de instalação padrão para o seu sistema.

---

### e) Docker (Opcional - para rodar o PostgreSQL em um contêiner)

Docker é uma plataforma que permite criar, testar e implantar aplicações rapidamente em ambientes isolados chamados contêineres. Utilizá-lo para rodar o PostgreSQL simplifica a instalação e evita conflitos com outras aplicações no seu sistema.

#### i. Instalação do Docker

**Windows**

1. **Acesse o site oficial:** Vá para [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. **Baixe o instalador:** Clique em "Download for Windows".
3. **Requisitos:** Certifique-se de que a virtualização está habilitada na BIOS do seu computador e que você tem o WSL 2 (Windows Subsystem for Linux 2) instalado. O instalador do Docker geralmente oferece ajuda para configurar o WSL 2, caso seja necessário.
4. **Execute o instalador:** Siga as instruções na tela. Pode ser necessário reiniciar o computador para concluir a instalação.

**macOS**

1. **Acesse o site oficial:** Vá para [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. **Baixe o instalador:** Escolha a versão correta para o seu Mac (com processador Intel ou Apple Silicon).
3. **Instale:** Após o download, abra o arquivo `.dmg` e arraste o ícone do Docker para a sua pasta de "Aplicativos".

**Linux (Ubuntu/Debian)**

1. **Abra o Terminal.**
2. **Siga o guia de instalação oficial:** Para a maioria das distribuições baseadas em Debian/Ubuntu, os passos são os seguintes:
   **Bash**

   ```
   # 1. Desinstale versões antigas, caso existam
   sudo apt-get remove docker docker-engine docker.io containerd runc

   # 2. Configure o repositório do Docker
   sudo apt-get update
   sudo apt-get install ca-certificates curl gnupg
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   # 3. Instale o Docker Engine
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

3. **Verifique a instalação** executando a imagem de teste:
   **Bash**

   ```
   sudo docker run hello-world
   ```

#### ii. Configurando o PostgreSQL via Contêiner Docker

Depois de instalar o Docker, você pode criar e rodar um contêiner com o PostgreSQL usando um único comando no seu terminal (Prompt de Comando, PowerShell ou Terminal).

1. **Abra seu terminal.**
2. **Execute o comando abaixo:** Este comando irá baixar a imagem do PostgreSQL (se ainda não existir localmente), criar um contêiner e iniciá-lo.
   **Bash**

```
docker run --name postgres-container -e POSTGRES_PASSWORD=sua-senha-aqui -p 5432:5432 -d postgres:latest
```

**Importante:** Substitua `sua-senha-aqui` por uma senha forte e segura.

3. **Entendendo o comando:**

   - `docker run`: Comando para criar e iniciar um novo contêiner.
   - `--name postgres-container`: Define um nome para o seu contêiner, facilitando o gerenciamento.
   - `-e POSTGRES_PASSWORD=sua-senha-aqui`: Cria uma variável de ambiente dentro do contêiner para definir a senha do usuário `postgres` do PostgreSQL. **Esta é a parte mais importante para a configuração inicial.**
   - `-p 5432:5432`: Mapeia a porta `5432` do seu computador (host) para a porta `5432` do contêiner. Isso permite que aplicações na sua máquina (como o DBeaver) se conectem ao PostgreSQL que está rodando dentro do contêiner.
   - `-d`: Executa o contêiner em modo "detached" (em segundo plano), liberando seu terminal.
   - `postgres:latest`: Especifica a imagem que o Docker deve usar. Neste caso, a versão mais recente da imagem oficial do PostgreSQL.

4. **Verifique se o contêiner está em execução:**
   **Bash**

   ```
   docker ps
   ```

   Você deverá ver `mysql-container` na lista de contêineres em execução.

---

### f) MySQL (Alternativa ao Docker)

Se você preferir não usar o Docker, pode instalar o MySQL diretamente no seu sistema operacional.

#### **Windows**

1. **Acesse o site oficial:** Vá para a página de downloads do [link suspeito removido].
2. **Baixe o instalador:** Na seção "MySQL Installer for Windows", clique em "Download". Na página seguinte, você pode clicar em "No thanks, just start my download."
3. **Execute o instalador:** Abra o arquivo `.msi`.
4. **Escolha o tipo de instalação:** Para a maioria dos usuários, a opção "Developer Default" é adequada.
5. **Siga as instruções:** O instalador guiará você pela configuração, incluindo a definição de uma senha para o usuário `root`. **Anote essa senha, pois você precisará dela para se conectar ao banco de dados.**

#### **macOS (usando Homebrew)**

1. **Abra o Terminal.**
2. **Instale o MySQL:**
   **Bash**

   ```bash
   brew install postgresql
   ```

3. **Inicie o serviço do PostgreSQL:**
   **Bash**

```bash
brew services start postgresql
```

4. **Configure a segurança:**
   **Bash**

   ```
   # PostgreSQL não tem um comando equivalente direto a mysql_secure_installation.
   # A segurança é configurada durante a instalação e através de arquivos de configuração.
   # Para definir a senha do usuário 'postgres' (se não o fez durante a instalação):
   # psql -U postgres
   # ALTER USER postgres WITH PASSWORD 'sua-nova-senha';
   ```

   Siga as instruções na tela para definir a senha do usuário `postgres` e configurar outras opções de segurança.

#### **Linux (Ubuntu/Debian)**

1. **Abra o Terminal.**
2. **Instale o servidor PostgreSQL:**
   **Bash**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

3.  **Configure a segurança (opcional, se não configurado durante a instalação):**
    **Bash**

```bash
# Mude para o usuário postgres
sudo -i -u postgres
# Acesse o prompt do PostgreSQL
psql
# Defina a senha para o usuário 'postgres'
ALTER USER postgres WITH PASSWORD 'sua-nova-senha';
# Saia do psql
\q
# Saia do usuário postgres
exit
```

Este comando permitirá que você configure a senha do `postgres` e outras configurações de segurança.

---

# 2 - Configuração do Ambiente

Com todas as ferramentas instaladas, o próximo passo é configurar o projeto para execução.

---

### a) Criação do banco de dados no PostgreSQL

Para que a aplicação funcione, é necessário criar o banco de dados que ela utilizará. O nome do banco de dados deve ser `tcc_db`. Abaixo estão duas maneiras de fazer isso:

#### **Método 1: Usando um Gerenciador de Banco de Dados (DBeaver)**

1.  **Abra o DBeaver** e conecte-se à sua instância do PostgreSQL.
    - **Host**: `localhost`
    - **Porta**: `5432`
    - **Usuário**: `postgres`
    - **Senha**: A senha que você definiu durante a instalação do MySQL ou no comando do Docker.
2.  No menu de navegação à esquerda, clique com o botão direito sobre a sua conexão e selecione **"Criar Novo Banco de Dados"**.
3.  No campo **"Nome do Banco de Dados"**, digite `tcc_db`.
4.  Mantenha o conjunto de caracteres padrão (`utf8mb4`) ou conforme a necessidade do projeto.
5.  Clique em **"OK"**. O banco de dados será criado.

#### **Método 2: Usando o Terminal (Linha de Comando)**

1.  **Abra um novo terminal** (Prompt de Comando, PowerShell ou Terminal).
2.  **Conecte-se ao PostgreSQL** como usuário `postgres`. Será solicitada a sua senha.
    ```bash
    psql -U postgres
    ```
3.  Após se conectar, você verá o prompt `mysql>`. **Execute o comando SQL** abaixo para criar o banco de dados:
    ```sql
    CREATE DATABASE tcc_db;
    ```
4.  Para confirmar que foi criado, você pode listar todos os bancos de dados:
    ```sql
    SHOW DATABASES;
    ```
5.  Você deverá ver `tcc_db` na lista. Para sair do MySQL, digite `exit`.

---

### b) Instalação de bibliotecas para o backend em NestJS

Com o Node.js já instalado, agora precisamos baixar todas as dependências (bibliotecas) que o projeto utiliza.

1.  **Abra um terminal** na pasta raiz do projeto backend.
2.  **Execute o comando de instalação** usando o `npm` (que foi instalado junto com o Node.js). Este comando lerá o arquivo `package.json` e instalará todas as bibliotecas listadas nele.

    ```bash
    npm install
    ```

3.  Aguarde até que o processo seja finalizado. Uma pasta chamada `node_modules` será criada no diretório do seu projeto, contendo todas as dependências.

---

### c) Configuração e preenchimento da `.env`

As variáveis de ambiente são usadas para guardar informações sensíveis ou configurações que podem mudar entre diferentes ambientes (desenvolvimento, produção, etc.).

1.  Na pasta raiz do projeto backend, você encontrará um arquivo chamado `.env.example`. Este é um modelo de como o seu arquivo de configuração deve ser.
2.  **Crie uma cópia** deste arquivo e renomeie-a para `.env`.
3.  **Abra o arquivo `.env`** no seu editor de código (VS Code) e preencha as variáveis com os valores corretos para o seu ambiente de desenvolvimento local.

**Conteúdo do seu `.env`:**

```env
# Porta em que a aplicação backend irá rodar
PORT=3001

# Configurações do Banco de Dados (PostgreSQL)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=sua_senha_do_banco_de_dados # <-- SUBSTITUA PELA SUA SENHA
DATABASE_NAME=tcc_db

# Configurações de Autenticação (JWT - JSON Web Token)
JWT_SECRET=tcc_secret
JWT_EXPIRES_IN=1d

# Configuração para Criptografia de Senhas
BCRYPT_SALT=10
```
