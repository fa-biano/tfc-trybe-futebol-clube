# ⚽ Projeto TFC - Trybe Futebol Clube!

Foi desenvolvido um Backend para gerenciamento das partidas e classificações de um campeonato de times de
futebol, sendo posteriormente integrado ao Frontend fornecido por outro squad, utilizando a orquestração de containers
do Docker. 

Esse backend é uma Api Rest construída com Typescript e paradigma de Orientação a Objetos (POO).</br>
Os dados são armazenados no Banco de Dados MySQL com modelagem através do Sequelize. 

Também possui rotas com autenticação de usuário através do JWT, tratativa de erros por middleware, além de lógica criada para
cálculo de pontuação dos times para construção do quadro de classificação, a cada partida finalizada.

O desenvolvimento desse projeto foi realizado durante o curso de Desenvolvimento Web na [Trybe](https://www.betrybe.com/)!

<!-- ## Como utilizar:

Clone o repositório: `git clone link`.

<details>
  <summary><strong>Rodando com Docker :whale: </strong></summary>
  
  ## 👉 Com Docker
   **⚠ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
   
   > Rode o serviço `node` com o comando `docker-compose up -d --build`.
  - Esse serviço irá inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
  
   > :information_source: Use o comando `docker exec -it car_shop bash`.
   
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **⚠ Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - ✨ **Dica:** O projeto espera que a versão do `node` utilizada seja a 16.

  <br>  
</details> -->

## ✨ Inicializando:

  Clone o repositório: `git clone git@github.com:fa-biano/tfc-trybe-futebol-clube.git`

  Instale as dependências `npm install`
  
  Renomeie os arquivos `.env.example` para `.env` nos diretórios `/frontend` e `/backend`

  Execute `npm run compose:up` para o docker-compose subir os serviços de frontend, backend e banco de dados da aplicação

## 📭 Rotas:

O Frontend está rodando na porta `3000` e o Backend na porta `3001`. Seguem as rotas que podem ser acessadas:

  `/login`: </br>
    - POST: realiza login para usuário existente; (teste com: `admin@admin.com`, senha: `secret_admin`) </br>
    - GET: `/login/role` identifica qual o grupo de usuário da pessoa logada (usuário ou admin);

  `/teams`: </br>
    - GET: lista os times cadastrados; </br>
    - GET: `/teams/:id` traz as informações do time conforme id; </br>

  `/match`: </br>
    - GET: lista as partidas do campeonato; </br>
    - POST: cria nova partida entre 2 times de futebol; </br>
    - PATCH: `/match/:id` atualiza os gols marcados em uma partida; </br>
    - PATCH: `/match/:id/finish` encerra partida de futebol entre 2 times;
    
  `/leaderboard`: </br>
    - GET: lista os dados para a tabela de classificação do campeonato entre os times de futebol, ordenado pelo time com maior pontuação e outos critérios de desempate; </br>
    - GET: `/leaderboard/home` retorna a tabela de classificação apenas dos times mandantes das partidas de futebol; </br>
    - GET: `/leaderboard/away` retorna a tabela de classificação apenas dos times que eram visitantes; </br>

Utilize o seu client preferido para testar as rotas acima ou um browser web para testar as rotas pelo Frontend.

## 🔥 Tecnologias utilizadas:

  **Back-end:** Typescript, Node.js, Express, Sequelize (ORM) e JWT (jsonwebtoken) para Autenticação </br>
  **Banco de Dados:** SQL MySQL </br>
  **Paradigma:** Programação Orientada a Objetos (POO)
  
## 🔗 Deploy: 
https://tfc-frontend-production.up.railway.app/
