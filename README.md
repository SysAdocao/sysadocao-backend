# SysAdoção

## Descrição

**SysAdoção** é uma aplicação web desenvolvida para modernizar e organizar o processo de adoção em um abrigo de animais. A plataforma permite ao abrigo cadastrar pets disponíveis para adoção, registrar adotantes e acompanhar todo o processo de adoção, tornando o fluxo mais rápido, eficiente e acessível.

## Contexto

Atualmente, o abrigo controla manualmente todas as informações dos pets e adotantes, o que resulta em atrasos e falta de organização. Com o **SysAdoção**, o abrigo poderá gerenciar informações de forma digital, facilitando o cadastro de pets e a conexão com possíveis adotantes.

## Objetivo

- Permitir o cadastro e visualização de pets disponíveis para adoção.
- Facilitar o registro e gerenciamento de adotantes.
- Acompanhar o processo de adoção de forma eficiente.

## Funcionalidades

1. Cadastro e visualização de pets disponíveis para adoção.
2. Registro de adotantes com informações relevantes.
3. Realização e acompanhamento do processo de adoção.

---

## Tecnologias Utilizadas

- **Node.js** + **Express**: Backend da aplicação.
- **Typescript**: Superset de JavaScript que adiciona tipagem estática ao projeto.
- **Zod**: Validação de dados.
- **Prisma**: ORM para comunicação com o banco de dados.
- **Docker** + **Docker Compose**: Facilita a criação de um ambiente para o banco de dados.
- **PostgreSQL**: Banco de dados relacional para armazenar informações dos pets e adotantes.

---

## Como Iniciar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Docker** e **Docker Compose**

### Passo a Passo

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/SysAdocao/sysadocao-backend.git
    cd sysadocao-backend
    ```

2. **Instale as dependências do Node.js**:

    ```bash
    npm install
    ```

3. **Configure o banco de dados**:

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/sysadocao"
    NODE_ENV="development"
    PORT=3000
    SECRET_JWT="sua_chave_secreta_jwt_aqui"
    ```

   > Lembre-se de substituir `user` e `password` com as credenciais corretas.

4. **Inicie o banco de dados com Docker Compose**:

    ```bash
    docker-compose up -d
    ```

    > Esse comando vai criar e iniciar o banco de dados PostgreSQL em um contêiner Docker.

5. **Execute as migrações do Prisma** para criar as tabelas no banco de dados:

    ```bash
    npx prisma migrate dev
    ```

6. **Inicie o servidor**:

    ```bash
    npm run dev
    ```

    O servidor estará rodando em `http://localhost:3000`.

---

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---