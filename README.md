# TFC API: Um golaço em tecnologia ⚽️

Este projeto é uma API para um site informativo sobre partidas e classificações de futebol. Foi desenvolvido utilizando as seguintes tecnologias:

* **Node.js**
* **TypeScript**
* **Express**
* **Sequelize**
* **JWT**
* **TDD**

## Requisitos

A API deve atender aos seguintes requisitos:

### São 4 fluxos principais:

* **Fluxo 1: Times**
    * Criação de uma migration e um model para a tabela de times
    * Criação de um endpoint /teams que retorna uma lista de todos os times
    * Criação de um endpoint /teams/:id que retorna os dados de um time específico
* **Fluxo 2: Usuários e Login**
    * Criação de uma migration e um model para a tabela de usuários
    * Criação de um endpoint /login que permite o login de usuários
    * Validação de que o login é feito com um email e senha válidos
    * Criação de um endpoint /login/role que retorna o tipo de usuário
* **Fluxo 3: Partidas**
    * Criação de uma migration e um model para a tabela de partidas
    * Criação de um endpoint /matches que retorna uma lista de todas as partidas
    * Criação de um endpoint /matches?inProgress=true que retorna uma lista de partidas em andamento
    * Criação de um endpoint /matches?inProgress=false que retorna uma lista de partidas finalizadas
    * Criação de um endpoint /matches/:id que retorna os dados de uma partida específica
    * Validação de que as partidas só podem ser alteradas por usuários com permissão
* **Fluxo 4: Placares**
    * Criação de uma migration e um model para a tabela de placares
    * Criação de um endpoint /scores que retorna uma lista de todos os placares
    * Criação de um endpoint /scores/:id que retorna os dados de um placar específico

## Implementação

A API foi implementada utilizando o padrão de projeto **SOLID**, com **modelagem de dados** utilizando o **Sequelize**. As **regras de negócio** foram implementadas utilizando a **metologia TDD**, com os testes realizados utilizando os frameworks **Jest** e **Mocha**.

## Dockerização

A API foi **dockerizada** utilizando o **docker-compose**, para que possa ser facilmente executada em qualquer ambiente.

## Demonstração

Para subir o back e o front end da TFC API, siga estas etapas:

1. Clone o repositório do GitHub:

```
git clone git@github.com:jvictorgui/Trybe-Futebol-Clube.git
```

2. Entre na pasta do projeto:

```
cd Trybe-Futebol-Clube
```

3. Instale as dependências:

```
npm install
```

4. Suba o back e o front end usando o comando `npm run compose:up`:

```
npm run compose:up
```

Em seguida, acesse o site http://localhost:3000 para visualizar o front-end.

Para logar como administrador, use o seguinte email e senha:

* Email: `admin@admin.com`
* Senha: `secret_admin`




