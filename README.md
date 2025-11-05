# Sistema Escolar (em desenvolvimento)

Projeto de estudo de um sistema de cadastro escolar para praticar conceitos de engenharia de software:
- SOLID aplicado a camadas (controllers, services, repositories)
- API REST
- Escalabilidade e separação de responsabilidades
- TypeScript no backend e (futuro) frontend

## Arquitetura
Monorepo com serviços independentes (cada um com seu servidor HTTP, regras de negócio, repositórios e testes):
- Server/servico-alunos: CRUD e consultas de alunos, usando Prisma (SQLite) e Jest.
- Server/servico-matriculas: fluxo de matrículas e cursos, usando SQLite puro e Jest.

Cada serviço segue uma divisão em camadas:
- controllers: camada de entrada (HTTP)
- services: regras de negócio (aplicam princípios SOLID)
- repositories: contratos (interfaces) + implementações (Prisma/SQLite) e fakes para testes

## Tecnologias
- Node.js + TypeScript
- Express
- Prisma (no serviço de alunos) e SQLite/SQLite3 (no serviço de matrículas)
- Jest e Supertest para testes
- TSX para desenvolvimento (watch)

## Estrutura (resumo)
```
Server/
  servico-alunos/
    src/ { app.ts, server.ts, controllers, services, repositories, routes, models }
    prisma/ { schema.prisma, migrations }
  servico-matriculas/
    src/ { app.ts, server.ts, controllers, services, repositories, routes, models, database }
```

## Como executar (local)
Pré-requisitos:
- Node.js 18+ e npm
- Definir a variável de ambiente PORT para cada serviço (ex.: 3001, 3002)
- (Alunos) Opcional: configurar `.env`/`.env.test` conforme necessário ao Prisma/SQLite

Serviço de Alunos:
1) Instalar dependências
2) Preparar banco (opcional p/ desenvolvimento ou testes)
3) Subir em modo desenvolvimento
4) Testes

Comandos (exemplos):
- Instalação: `npm install`
- Desenvolvimento: `npm run dev`
- Testes: `npm test`
- Banco (tests): `npm run db:test:setup`

Observação: execute os comandos dentro de `Server/servico-alunos`.

Serviço de Matrículas:
1) Instalar dependências
2) Inicializar banco local (SQLite)
3) Subir em modo desenvolvimento
4) Testes

Comandos (exemplos):
- Instalação: `npm install`
- Inicializar DB: `npm run db:init`
- Desenvolvimento: `npm run dev`
- Testes: `npm test`

Observação: execute os comandos dentro de `Server/servico-matriculas`.

## Endpoints (visão geral)
- Alunos: `GET /` (healthcheck), rotas específicas em `routes/student.routes.ts`
- Matrículas: `GET /` (healthcheck), rotas sob `/api/v1` em `routes/enrollment.routes.ts`

## Status
Em desenvolvimento (WIP). O foco é aprendizado e evolução incremental da arquitetura e testes.

## Próximos passos (ideias)
- Adicionar frontend em TypeScript (ex.: React) consumindo os serviços
- Documentar APIs com OpenAPI/Swagger
- Autenticação/autorização e observabilidade
- CI para testes e checagens
