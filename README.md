# Backend para desafio Solides

Este projeto foi desenvolvido para fornecer um backend para a aplicação ReactJS do Desafio da empresa Solides. O projeto foi feito utilizando as seguintes tecnologias:

  - NodeJS
  - Postgres
  - Docker

# .env
Precisamos criar o arquivo .env com as variáveis de ambiente necessárias para executar a aplicação. O arquivo .env-example possui todas as varíaveis que devem ser utilizadas.

## Docker

O docker foi usado para utilização de um container com o banco de dados da aplicação.
Comando utilizado para criação do banco de dados:

```sh
$ docker run --name <nome-do-banco> -e POSTGRES_PASSWORD=<senha> -p 5432:5432 -d <usuario>
```

### Migrations

Para criarmos as tabelas no banco de dados recisamos executar o seguinte comando dentro da pasta do projeto


```sh
$ sequelize db:migrate
```
### Executar localmente


na pasta do projeto:
```sh
$ yarn dev
```


License
----

MIT
>
