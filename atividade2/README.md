# Atividade Prática 02 - NODE
* Desenvolva uma API para controle de dieta diária

## Tecnologias a serem utilizadas:
* Node.js
* Typescript
* Fastify
* Knex
* Sqlite ou qualquer banco SQL

## Configuração do projeto

### 1. Clone o repositório

```bash
git clone https://github.com/AngeloResplandes/atividades-web2.git
cd atividades-web2
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode as migrations

```bash
npx knex --knexfile src/knexfile.ts migrate:latest
```

### 4. Inicie o servidor

```bash
npm run dev        // Para rodar a aplicação
npm run migrate    // Rodar todas as migrations pendentes
npm run rollback   // Desfazer a última migration aplicada
```
