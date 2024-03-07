# API para aplicativo de finanças

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Aplicação backend que fornece uma API para um aplicativo Mobile de controle de contas. Desenvolvido para um projeto acadêmico.

## Requisitos Funcionais

- [ ] Usuário deve ser capaz de se registrar.
- [ ] Deve ser capaz de autenticar.
- [ ] Deve ser capaz de retornar o perfil do usuário logado.
- [ ] Deve ser capaz de retornar as contas mensais do usuário.
- [ ] Deve ser capaz de registrar novas contas.
- [ ] Deve permitir ao usuário deletar seu próprio perfil.

## Regras de negócio

- [ ] Usuários não podem se registrar com e-mails duplicados.

## Requisitos não funcionais

- [ ] Senha do usuário deve ser criptografada.
- [ ] Dados do usuário devem ser armazenados em um banco de dados PostgreSQL.
- [ ] Usuário deve ser identificado por JWT (JSON Web Token).

## Instalação

### Node e PnPM

A aplicação é desenvolvida com [Node.js](https://nodejs.org/) e utiliza o [PnPM](https://pnpm.io/pt/) como gerenciador de pacotes.

#### Versões

| Node | >= 20.10.0 |
| ---- | ---------- |
| PnPM | >= 8.15.4  |

#### Instalar [PnPM](https://pnpm.io/pt/installation)

Caso já tenha o Node.js instalado na máquina, basta executar o comando:

```console
 corepack enable pnpm
```

Depois instale as dependências executando o seguinte comando no diretório raiz do projeto:

```console
  pnpm install
```

Executar o script de inicialização da aplicação:

```console
  pnpm dev
```

### Banco de dados

Para instalação de um banco dados local para fins de desenvolvimento recomendo utilizar o [Docker](https://www.docker.com/) a partir do arquivo docker-compose.yml que está na raiz do projeto.

#### Variáveis de configuração do container

Essas variáveis são definidas no arquivo docker-compose.yml e correspondem, respectivamente, ao usuário do banco, senha deste usuário e nome do banco.

```yml
environment:
  - POSTGRESQL_USERNAME=docker
  - POSTGRESQL_PASSWORD=docker
  - POSTGRESQL_DATABASE=finances
```

#### Comandos básicos para gerenciar o ciclo de vida de um container

Subir o container

```console
docker-compose -f docker-compose.yml up -d
```

Parar o container

```console
docker-compose -f docker-compose.yml stop
```

Derrubar o container (deleta o banco)

```console
docker-compose -f docker-compose.yml down
```

### Colaboração

Qualquer colaboração de código, crítica construtiva ou report de bugs/erros é bem vinda.

Ao realizar _commits_, por favor seguir o _[Conventional Commits Pattern](https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657)_.
